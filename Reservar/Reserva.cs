namespace Reservar
{
    public class Reserva
    {
        public int idReserva { get; set; }
        public string usuRes { get; set; }
        public int Cantidad { get; set; }
        public int idReu { get; set; }

        public Reserva(int reser, string usu, int cant, int reu)
        {
            this.idReserva = reser;
            this.usuRes = usu;
            this.Cantidad = cant;
            this.idReu = reu;
        }

        public Reserva()
        {
        }
    }
}
