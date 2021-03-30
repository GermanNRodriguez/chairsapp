using Logic;
using Reservar;
using System.Collections.Generic;
using System.Web.Http;

namespace PáginaWebAsientos.Controller
{
    public class GrupoController : ApiController
    {
        public IEnumerable<Grupo> Get(Grupo grupo)
        {
            return Manager.AcquireGroup(grupo);
        }

        public int Post([FromBody]Grupo grupo)
        {
            return Manager.KeepGroup(grupo);
        }
    }
}
