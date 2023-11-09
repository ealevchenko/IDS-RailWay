using EF_IDS.Concrete;
using EF_IDS.Concrete.Directory;
using EF_IDS.Concrete.Outgoing;
using EF_IDS.Concrete.Arrival;
using EF_IDS.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS_
{
    public class IDS_WIR : IDS_Base
    {
        private DbContextOptions<EFDbContext> options;
        private readonly ILogger<Object> _logger;
        private readonly IConfiguration _configuration;
        private String? connectionString;

        public IDS_WIR() : base()
        {

        }
        public IDS_WIR(ILogger<Object> logger, IConfiguration configuration) : base()
        {
            _logger = logger;
            _configuration = configuration;

            connectionString = configuration.GetConnectionString("IDS");
            var optionsBuilder = new DbContextOptionsBuilder<EFDbContext>();
            this.options = optionsBuilder.UseSqlServer(connectionString).Options;
        }
        /// <summary>
        /// Обновить по сданному или отправленному составу оператора АМКР
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateWagon UpdateOperationOutgoingSostav(ref EFDbContext context, long id_outgoing_sostav, string user)
        {
            ResultUpdateWagon result = new ResultUpdateWagon(0);
            try
            {
                if (context == null)
                {
                    context = new EFDbContext(this.options);
                };
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoingCar ef_out_car = new EFOutgoingCar(context);
                EFOutgoingUzVagon ef_out_vag = new EFOutgoingUzVagon(context);
                EFDirectoryWagonsRent ef_wag_rent = new EFDirectoryWagonsRent(context);
                OutgoingSostav? sostav = ef_out_sostav.Context.Where(s => s.Id == id_outgoing_sostav).FirstOrDefault();
                List<ChangeID> del_id_wr = new List<ChangeID>(); // Список id rent для удаления

                if (sostav != null)
                {
                    // Состав определен (сдан или отправлен)
                    if (sostav.Status >= 2 && sostav.Status <= 3)
                    {
                        List<OutgoingCar> cars = ef_out_car.Context.Where(c => c.IdOutgoing == sostav.Id && c.PositionOutgoing != null).ToList();
                        result.count = cars.Count();
                        _logger.LogInformation("По сотаву {0} Определено {1} вагонов", id_outgoing_sostav, result.count);
                        //Console.WriteLine("По сотаву {0} Определено {1} вагонов", id_outgoing_sostav, result.count);
                        foreach (OutgoingCar car in cars)
                        {
                            OutgoingUzVagon? vag = ef_out_vag.Context.Where(v => v.Id == car.IdOutgoingUzVagon).FirstOrDefault();
                            if (vag != null)
                            {
                                // Получим аренды по данному вагону
                                DirectoryWagonsRent? rent = ef_wag_rent.Context.Where(r => r.Num == vag.Num && r.RentStart <= sostav.DateOutgoing && r.RentEnd > sostav.DateOutgoing).FirstOrDefault();
                                DirectoryWagonsRent? rent_null = ef_wag_rent.Context.Where(r => r.Num == vag.Num && r.RentStart <= sostav.DateOutgoing && r.RentEnd == null).OrderByDescending(c => c.Id).FirstOrDefault();
                                int? id_wagons_rent_outgoing = null;
                                id_wagons_rent_outgoing = rent != null ? (int?)rent.Id : rent_null != null ? (int?)rent_null.Id : null;
                                // если аренда новая и записаная - разные, изменим аренду
                                if (id_wagons_rent_outgoing != null && vag.IdWagonsRentOutgoing != id_wagons_rent_outgoing)
                                {
                                    vag.IdWagonsRentOutgoing = id_wagons_rent_outgoing;
                                    vag.Change = DateTime.Now;
                                    vag.ChangeUser = user;
                                    result.SetUpdateResult(1, vag.Num);
                                    _logger.LogInformation("По вагону {0} определена замена аренды на отправку {1}", vag.Num, id_wagons_rent_outgoing);
                                }
                                else
                                {
                                    result.SetSkipResult(0, vag.Num);
                                }
                            }
                        }
                        if (result.update > 0)
                        {
                            result.SetResult(context.SaveChanges());
                        }
                    }
                    else
                    {
                        result.SetResult((int)errors_base.error_status_outgoing_sostav); // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                    }
                }
                else
                {
                    result.SetResult((int)errors_base.not_outgoing_sostav_db); //В базе данных нет записи состава
                }
                _logger.LogInformation("По составу {0} определено {1} вагонов (обновновить: {2}, пропустить :{3}), результат обновления :{4}", id_outgoing_sostav, result.count, result.update, result.skip, result.result);
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "UpdateOperationOutgoingSostav");
                //e.ExceptionMethodLog(String.Format("UpdateOperationOutgoingSostav(context={0}, id_outgoing_sostav={1}, user={2})",
                //    context, id_outgoing_sostav, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Обновить по сданному или отправленному составу оператора АМКР
        /// </summary>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateWagon UpdateOperationOutgoingSostav(long id_outgoing_sostav, string user)
        {
            ResultUpdateWagon rt = new ResultUpdateWagon(0);
            try
            {
                EFDbContext context = new EFDbContext(this.options);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                return UpdateOperationOutgoingSostav(ref context, id_outgoing_sostav, user);
            }
            catch (Exception e)
            {
                //e.ExceptionMethodLog(String.Format("UpdateOperationOutgoingSostav(id_outgoing_sostav={0}, user={1})",
                //    id_outgoing_sostav, user), servece_owner, eventID);
                _logger.LogError(e, "UpdateOperationOutgoingSostav");
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        public OperationResultID UpdateOperationOutgoingSostav(DateTime date_outgoing, string user)
        {
            OperationResultID rt = new OperationResultID();
            try
            {
                EFDbContext context = new EFDbContext(this.options);

                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                //OutgoingSostav sostav = ef_out_sostav.Get(210619);               
                List<OutgoingSostav> list_sostav = ef_out_sostav.Context.Where(s => s.DateOutgoing >= date_outgoing).ToList();
                foreach (OutgoingSostav sost in list_sostav)
                {
                    ResultUpdateWagon rt_st = UpdateOperationOutgoingSostav(sost.Id, user);
                    rt.SetResultOperation(rt_st.result, sost.Id);
                }
                _logger.LogInformation("Выполнение завершено, определено {0} составов, код выполнения {1}", rt.listResult.Count(), rt.result);

                return rt;
            }
            catch (Exception e)
            {
                //e.ExceptionMethodLog(String.Format("UpdateOperationOutgoingSostav(date_outgoing={0}, user={1})",
                //    date_outgoing, user), servece_owner, eventID);
                _logger.LogError(e, "UpdateOperationOutgoingSostav");
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }

        public int ClearDoubling_Directory_WagonsRent(string user)
        {
            try
            {
                EFDbContext context = new EFDbContext(this.options);

                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDirectoryWagonsRent ef_wag_rent = new EFDirectoryWagonsRent(context);
                EFArrivalUzVagon ef_arr_vag = new EFArrivalUzVagon(context);
                EFOutgoingUzVagon ef_out_vag = new EFOutgoingUzVagon(context);
                List<DirectoryWagonsRent> list = ef_wag_rent.Context.Where(r => r.ParentId != null).ToList();
                List<IGrouping<int?, DirectoryWagonsRent>> grents = list.GroupBy(r => r.ParentId).ToList().Where(c => c.Count() > 1).OrderBy(k => k.Key).ToList();
                foreach (IGrouping<int?, DirectoryWagonsRent> gr_wr in grents.ToList())
                {
                    List<DirectoryWagonsRent> list_gr = gr_wr.Where(r => r.RentEnd == null).ToList();

                    DirectoryWagonsRent cur_wr = null; // Получим строку аренды которую оставим
                    if (list_gr.Count == gr_wr.Count())
                    {
                        // нет закрытий
                        // Получим строку аренды которую оставим
                        cur_wr = gr_wr.OrderByDescending(c => c.Id).FirstOrDefault();
                    }
                    else
                    {
                        // Получим строку аренды которую оставим
                        cur_wr = gr_wr.Where(r => r.RentEnd != null).OrderByDescending(c => c.Id).FirstOrDefault();

                    }
                    // Получим список для удаления
                    List<DirectoryWagonsRent> del_wr = gr_wr.Where(r => r.Id != cur_wr.Id).ToList();
                    // переводим на аренду которую оставили
                    foreach (DirectoryWagonsRent rent in del_wr) {
                        //ArrivalUzVagon arr_vag = ef_arr_vag.Context.Where(a=>a.id)
                    }
                }
                //EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                ////OutgoingSostav sostav = ef_out_sostav.Get(210619);               
                //List<OutgoingSostav> list_sostav = ef_out_sostav.Context.Where(s => s.DateOutgoing >= date_outgoing).ToList();
                //foreach (OutgoingSostav sost in list_sostav)
                //{
                //    ResultUpdateWagon rt_st = UpdateOperationOutgoingSostav(sost.Id, user);
                //    rt.SetResultOperation(rt_st.result, sost.Id);
                //}
                //_logger.LogInformation("Выполнение завершено, определено {0} составов, код выполнения {1}", rt.listResult.Count(), rt.result);

                return 0;
            }
            catch (Exception e)
            {
                //e.ExceptionMethodLog(String.Format("UpdateOperationOutgoingSostav(date_outgoing={0}, user={1})",
                //    date_outgoing, user), servece_owner, eventID);
                _logger.LogError(e, "ClearDoubling_Directory_WagonsRent");
                //rt.SetResult((int)errors_base.global);
                return (int)errors_base.global;// Возвращаем id=-1 , Ошибка
            }
        }

    }
}
