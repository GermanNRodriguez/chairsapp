namespace Reservar
{
    public class Grupo
    {
        public int nroGrupo { get; set; }
        public string Usuario { get; set; }
        public string Contraseña { get; set; }
        public int Cantidad { get; set; }
        public Grupo(int nrousu, int cant, string usu, string contra)
        {
            this.nroGrupo = nrousu;
            this.Usuario = usu;
            this.Contraseña = contra;
            this.Cantidad = cant;
        }
        public Grupo()
        {

        }

    }
}
