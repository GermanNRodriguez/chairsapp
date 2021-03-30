using System;
using Logic;
using Reservar;
using System.Web.Http;
using System.Collections.Generic;

namespace PáginaWebAsientos.Controller
{
    public class GrupoNController : ApiController
    {
        public string Post([FromBody]Grupo grupo)
        {
            return Manager.AcquireExistGroup(grupo);
        }

        public IEnumerable<Grupo> Get(int id)
        {
            return Manager.AcquireOneGroup(id);
        }


        // PUT: api/GrupoN/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/GrupoN/5
        public void Delete(int id)
        {
        }
    }
}
