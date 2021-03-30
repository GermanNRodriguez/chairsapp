using Logic;
using Reservar;
using System.Web.Http;

namespace PáginaWebAsientos.Controller
{
    public class GrupoEController : ApiController
    {
        public int Post([FromBody]Grupo grupo)
        {
            return Manager.AcquireNumbreGroup(grupo);
        }

    }
}
