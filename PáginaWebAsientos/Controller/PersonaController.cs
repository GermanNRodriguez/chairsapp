using Logic;
using Reservar;
using System.Collections.Generic;
using System.Web.Http;

namespace PáginaWebAsientos.Controller
{
    public class PersonaController : ApiController
    {
        public IEnumerable<Persona> Get()
        {
            return Manager.AcquirePeople();
        }
        public void Post([FromBody]Persona Person)
        {
            Manager.KeepPerson(Person);
        }

    }
}
