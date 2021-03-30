using Access;
using Reservar;
using System.Collections.Generic;

namespace Logic
{
    public class Manager
    {
        public static List<Persona> AcquirePeople()
        {
            return Functions.ObtainPeople();
        }//Adquiere Personas...
        public static List<Reserva> AcquireReservation()
        {
            return Functions.ObtainReservation();
        }// Reservas
        public static List<Grupo> AcquireGroup(Grupo grupo)
        {
            
                return Functions.ObtainGroup(); ;
            
           
        }// Grupos
        public static List<Reunion> AcquireMeeting ()
        {
            return Functions.ObtainMeeting();
        }// Reuniones
        public static string AcquireAdmin(Administrador Admin)
        {
            string mensaje = Functions.ObtainMensaje(Admin);

            if (mensaje.Equals("Usuario incorrecto"))
            {
                return mensaje;
            }
            else
            {
                List<Administrador> administrador = Functions.ObtainAdmin(Admin);

                for (int i = 0; i < administrador.Count; i++)
                {
                    if (Admin.Contraseña.Equals(administrador[i].Contraseña))
                    {
                        mensaje = "Usuario autenticado";
                        break;
                    }
                    else
                    {
                        mensaje = "La contraseña es incorrecta";
                    }
                }

            }
            return mensaje;
        }// Y los admins, aparte de que los verifica.
        public static string AcquireExistGroup(Grupo usuario)
        {
            return Functions.ObtainExistGroup(usuario);
        }// Verifica de que coincidan el usuario y la contraseña...
        public static int AcquireNumbreGroup(Grupo usuario)// Consigue el número del grupo
        {
            return Functions.ObtainNumberGroup(usuario);
        }
        public static List<Grupo> AcquireOneGroup (int id)
        {
            return Functions.ObtainOneGroup(id);
        }


        public static void KeepPerson(Persona Person)
        {
            Functions.SavePerson(Person);
        }// Guarda una persona nueva en un grupo
        public static void KeepReservation(Reserva Res)
        {
            Functions.SaveReservationt(Res);
        }
        public static int KeepGroup(Grupo group)
        {
            return Functions.SaveGroup(group);
        }// Guarda un grupo nuevo
        public static void KeepMeeting(Reunion Reu)
        {
            Functions.SaveMeeting(Reu);
        }// Guarda una reunion

        public static void EraseReservation(Reserva Res)
        {
            Functions.DeleteReservation(Res);
        }
        public static void EraseMeeting(Reunion Reu)
        {
            Functions.DeleteMeeting(Reu);
        }


        public static void ActualizeMeeting(Reunion Reu)
        {
            Functions.UpdateMeeting(Reu);
        } 
    }
}
