using Logic;
using Reservar;
using System.Collections.Generic;
using System.Web.Http;

namespace PáginaWebAsientos.Controller
{
    public class ReservaController : ApiController
    {
        public IEnumerable<Reserva> Get()
        {
            return Manager.AcquireReservation();
        }
        public void Post([FromBody]Reserva reserva)
        {
            Manager.KeepReservation(reserva);
        }
        public void Delete(Reserva res)
        {
            Manager.EraseReservation(res);
        }
        //GET: api/Asiento/5
        /*public IEnumerable<Reserva> Get()
        {
            return Manager.AcquireChairs();
        }
      /*  public Asiento Get()
        {
            return Manager.AcquireChairs();
        }*/
        /* public void Post([FromBody]Reserva Seat)
         {
             Manager.KeepSeat(Seat);
         }
         public void Put([FromBody]Reserva Seat)
         {
             Manager.updateS(Seat);
         }
         */



    }
}
