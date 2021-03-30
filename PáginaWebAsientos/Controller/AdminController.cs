using Logic;
using Reservar;
using System.Web.Http;

namespace PáginaWebAsientos.Controller
{
    public class AdminController : ApiController
    {

        // POST: api/Admin
        public string Post([FromBody]Administrador Admin)
        {
            return Manager.AcquireAdmin(Admin);
        }

    }
}
