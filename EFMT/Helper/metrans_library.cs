using EFMT.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFMT.Helper
{
    public static class metrans_library
    {
        public static ArrivalSostav GetArrivalSostav(this ArrivalSostav s)
        {
            return new ArrivalSostav()
            {
                id = s.id,
                id_arrived = s.id_arrived,
                file_name = s.file_name,
                composition_index = s.composition_index,
                date_time = s.date_time,
                operation = s.operation,
                create = s.create,
                close = s.close,
                arrived = s.arrived,
                Parent_id = s.Parent_id,
                ArrivalCars = s.ArrivalCars.ToList().Select(c => c.GetArrivalCars()).ToList(),
            };
        }

        public static ArrivalCars GetArrivalCars(this ArrivalCars c)
        {
            return new ArrivalCars()
            {
                id = c.id,
                id_sostav = c.id_sostav,
                position = c.position,
                num = c.num,
                country_code = c.country_code,
                wight = c.wight,
                cargo_code = c.cargo_code,
                cargo = c.cargo,
                station_code = c.station_code,
                station = c.station,
                consignee = c.consignee,
                operation = c.operation,
                composition_index = c.composition_index,
                date_operation = c.date_operation,
                train = c.train,
                num_doc_arrived = c.num_doc_arrived,
                arrived = c.arrived,
                parent_id = c.parent_id,
                user_name = c.user_name,
            };
        }

        public static Consignee GetConsignee(this Consignee c)
        {
            return new Consignee()
            {
                code = c.code,
                name = c.name,
                description = c.description,
                id_consignee = c.id_consignee,
                auxiliary = c.auxiliary,
            };
        }
    }
}
