namespace Reservar
{
    public class Reunion
    {
        public int nroReunion { get; set; }
        public string fecha { get; set; }
        public string hora { get; set; }
        public int cantMax { get; set; }

        public Reunion (int reu, string f, string h, int max)
        {
            this.nroReunion = reu;
            this.fecha = f;
            this.hora = h;
            this.cantMax = max;
        }
        public Reunion()
        {

        }
    }
}
