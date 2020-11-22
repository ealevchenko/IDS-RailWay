using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS
{
    public class IDS_RWT : IDS_Base
    {
        private eventID eventID = eventID.IDS_IDSRWT;

        public IDS_RWT() : base()
        {

        }

        public IDS_RWT(service servece_owner) : base(servece_owner)
        {

        }


        public OperationResult OperationUpdateWagonMarking(int num, int id_countrys, int id_genus, double? gruzp, double? tara, int kol_os, string usl_tip,
    DateTime? date_rem_vag, int? id_type_ownership, int? sign, string factory_number, string inventory_number, int? year_built, bool? exit_ban, int? id_operator, DateTime? start_rent, int? id_limiting, string user)
        {
            OperationResult result = new OperationResult();
            try
            {
                EFDbContext context = new EFDbContext();
                result.SetResultOperation(OperationUpdateWagon(ref context, num, id_countrys, id_genus, gruzp, tara, kol_os, usl_tip, date_rem_vag,
                    id_type_ownership, sign, factory_number, inventory_number, year_built, exit_ban, id_operator, start_rent, id_limiting, user), num);
                // Если нет ошибок тогда обновим базу
                if (result.error == 0)
                {
                    result.SetResult(context.SaveChanges());
                }
                else
                {
                    result.SetResult((int)errors_ids_dir.cancel_save_changes); // Ошибка изменение было отменено
                }
            }
            catch (Exception e)
            {
                //e.ExceptionMethodLog(String.Format("OperationUpdateWagons(list_nums={0}, edit_operator={1}, id_operator ={2}, start_rent={3}, edit_limiting ={4}, id_limiting={5},user={6})",
                //    list_nums, edit_operator, id_operator, start_rent, edit_limiting, id_limiting, user), servece_owner, eventID);
                result.SetResult((int)errors_ids_dir.global);// Ошибка нет списка id
            }
            return result;
        }

    }
}
