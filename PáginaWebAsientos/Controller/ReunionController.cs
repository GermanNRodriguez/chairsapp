using Logic;
using Reservar;
using System.Collections.Generic;
using System.Web.Http;

namespace PáginaWebAsientos.Controller
{
    public class ReunionController : ApiController
    {
        //GET: api/Asiento/5
        public IEnumerable<Reunion> Get()
        {
            return Manager.AcquireMeeting();
        }

        public void Post([FromBody]Reunion reu)
        {
            Manager.KeepMeeting(reu);
        }
    
        public void Delete(Reunion meet)
        {
            Manager.EraseMeeting(meet);
        }
    }
}
