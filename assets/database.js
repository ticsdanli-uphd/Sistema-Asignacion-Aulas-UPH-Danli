(function(){
  const TABLES={classes:'uph_classes',rooms:'uph_rooms',settings:'uph_settings'};
  const SESSION_KEY='uph_supabase_session';
  const QUEUE_KEY='uph_sync_queue';
  const clean=v=>String(v||'').replace(/\/+$/,'');
  const readJSON=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
  const writeJSON=(key,value)=>localStorage.setItem(key,JSON.stringify(value));

  class CloudDatabase{
    constructor(){this.url='';this.anonKey='';this.session=readJSON(SESSION_KEY,null)}
    configure(url,anonKey){this.url=clean(url);this.anonKey=String(anonKey||'').trim()}
    get configured(){return /^https:\/\/.+\.supabase\.co$/i.test(this.url)&&this.anonKey.length>20}
    get authenticated(){return Boolean(this.session?.access_token)}
    get user(){return this.session?.user||null}
    async signIn(email,password){
      if(!this.configured)throw new Error('Ingrese la URL y la clave pública de Supabase.');
      const r=await fetch(`${this.url}/auth/v1/token?grant_type=password`,{method:'POST',headers:{apikey:this.anonKey,'Content-Type':'application/json'},body:JSON.stringify({email,password})});
      const data=await r.json();if(!r.ok)throw new Error(data.error_description||data.msg||'No se pudo iniciar sesión.');
      this.session=data;writeJSON(SESSION_KEY,data);return data.user;
    }
    signOut(){this.session=null;localStorage.removeItem(SESSION_KEY)}
    async refreshSession(){
      if(!this.session?.refresh_token)throw new Error('La sesión venció. Inicie sesión nuevamente.');
      const r=await fetch(`${this.url}/auth/v1/token?grant_type=refresh_token`,{method:'POST',headers:{apikey:this.anonKey,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:this.session.refresh_token})});
      const data=await r.json();if(!r.ok){this.signOut();throw new Error('La sesión venció. Inicie sesión nuevamente.')}this.session=data;writeJSON(SESSION_KEY,data);return data;
    }
    async request(path,options={}){
      if(!this.configured)throw new Error('Supabase no está configurado.');
      if(!this.authenticated)throw new Error('Inicie sesión para usar la base de datos en línea.');
      const {retry=true,...fetchOptions}=options,headers={apikey:this.anonKey,Authorization:`Bearer ${this.session.access_token}`,'Content-Type':'application/json',...(options.headers||{})};
      const r=await fetch(`${this.url}${path}`,{...fetchOptions,headers});
      if(r.status===401&&retry){await this.refreshSession();return this.request(path,{...options,retry:false})}
      if(r.status===401)throw new Error('La sesión de la base de datos venció. Inicie sesión nuevamente.');
      if(!r.ok){let data={};try{data=await r.json()}catch{}throw new Error(data.message||data.hint||`Error de base de datos (${r.status}).`)}
      if(r.status===204)return null;const text=await r.text();return text?JSON.parse(text):null;
    }
    table(store){const table=TABLES[store];if(!table)throw new Error(`Colección no válida: ${store}`);return table}
    queue(operation){const q=readJSON(QUEUE_KEY,[]);q.push({...operation,queuedAt:new Date().toISOString()});writeJSON(QUEUE_KEY,q)}
    pendingCount(){return readJSON(QUEUE_KEY,[]).length}
    clearQueue(){writeJSON(QUEUE_KEY,[])}
    async upsert(store,records){
      if(!records.length)return;
      const rows=records.map(record=>({record_id:String(record.id??record.key),payload:record,updated_at:record._updatedAt||new Date().toISOString()}));
      await this.request(`/rest/v1/${this.table(store)}?on_conflict=record_id`,{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(rows)});
    }
    async remove(store,id){await this.request(`/rest/v1/${this.table(store)}?record_id=eq.${encodeURIComponent(id)}`,{method:'DELETE',headers:{Prefer:'return=minimal'}})}
    async list(store){const rows=await this.request(`/rest/v1/${this.table(store)}?select=record_id,payload,updated_at&order=updated_at.asc`);return (rows||[]).map(row=>({...row.payload,_updatedAt:row.payload?._updatedAt||row.updated_at}))}
    async flushQueue(){
      const queue=readJSON(QUEUE_KEY,[]);if(!queue.length)return 0;let completed=0;
      for(const item of queue){if(item.type==='delete')await this.remove(item.store,item.id);else await this.upsert(item.store,[item.record]);completed++}
      writeJSON(QUEUE_KEY,queue.slice(completed));return completed;
    }
  }
  window.UPHCloud=new CloudDatabase();
})();
