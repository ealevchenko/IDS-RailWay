using EFIDS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFIDS.Helper
{
    public static class ids_library
    {
        #region Directory

        public static Directory_GenusWagons GetGenusWagons(this Directory_GenusWagons g)
        {
            if (g == null) return null;
            return new Directory_GenusWagons()
            {
                id = g.id,
                abbr_ru = g.abbr_ru,
                genus_ru = g.genus_ru,
                abbr_en = g.abbr_en,
                genus_en = g.genus_en,
                rod_uz = g.rod_uz,
                rod_default = g.rod_default
            };
        }

        public static Directory_WagonManufacturers GetWagonManufacturers(this Directory_WagonManufacturers g)
        {
            if (g == null) return null;
            return new Directory_WagonManufacturers()
            {
                id = g.id,
                name_ru = g.name_ru,
                abbr_ru = g.abbr_ru,
                name_en = g.name_en,
                abbr_en = g.abbr_en,
            };
        }

        public static Directory_TypesRepairsWagons GetTypesRepairsWagons(this Directory_TypesRepairsWagons g)
        {
            if (g == null) return null;
            return new Directory_TypesRepairsWagons
            {
                id = g.id,
                abbr_ru = g.abbr_ru,
                type_repairs_ru = g.type_repairs_ru,
                abbr_en = g.abbr_en,
                type_repairs_en = g.type_repairs_en,

            };
        }

        public static Directory_ModelsWagons GetModelsWagons(this Directory_ModelsWagons m)
        {
            if (m == null) return null;
            return new Directory_ModelsWagons()
            {
                code = m.code,
                model_ru = m.model_ru,
                model_en = m.model_en
            };
        }

        public static Directory_TypeWagons GetTypeWagons(this Directory_TypeWagons t)
        {
            if (t == null) return null;
            return new Directory_TypeWagons()
            {
                id = t.id,
                type_ru = t.type_ru,
                type_en = t.type_en,

            };
        }

        public static Directory_TypeOwnerShip GetTypeOwnerShip(this Directory_TypeOwnerShip t)
        {
            if (t == null) return null;
            return new Directory_TypeOwnerShip()
            {
                id = t.id,
                type_ownership_ru = t.type_ownership_ru,
                type_ownership_en = t.type_ownership_en,
            };
        }

        public static Directory_OwnersWagons GetOwnersWagons(this Directory_OwnersWagons o)
        {
            if (o == null) return null;
            return new Directory_OwnersWagons()
            {
                id = o.id,
                abbr_ru = o.abbr_ru,
                owner_ru = o.owner_ru,
                abbr_en = o.abbr_en,
                owner_en = o.owner_en,
                local_use = o.local_use,
            };
        }

        public static Directory_LessorsWagons GetLessorsWagons(this Directory_LessorsWagons l)
        {
            if (l == null) return null;
            return new Directory_LessorsWagons()
            {
                id = l.id,
                abbr_ru = l.abbr_ru,
                lessors_ru = l.lessors_ru,
                abbr_en = l.abbr_en,
                lessors_en = l.lessors_en,
                paid = l.paid,
                rop = l.rop,
                local_use = l.local_use
            };
        }

        public static Directory_OperatorsWagons GetOperatorsWagons(this Directory_OperatorsWagons o)
        {
            if (o == null) return null;
            return new Directory_OperatorsWagons()
            {
                id = o.id,
                abbr_ru = o.abbr_ru,
                operators_ru = o.operators_ru,
                abbr_en = o.abbr_en,
                operators_en = o.operators_en,
                paid = o.paid,
                rop = o.rop,
                local_use = o.local_use,
                color = o.color,
                create = o.create,
                create_user = o.create_user,
                change = o.change,
                change_user = o.change_user,
                CardsWagons = null,
                Directory_Wagons = null,
                Directory_WagonsRent = null
            };
        }

        public static Directory_PoligonTravelWagons GetPoligonTravelWagons(this Directory_PoligonTravelWagons p)
        {
            if (p == null) return null;
            return new Directory_PoligonTravelWagons()
            {
                id = p.id,
                abbr_ru = p.abbr_ru,
                poligon_travel_ru = p.poligon_travel_ru,
                abbr_en = p.abbr_en,
                poligon_travel_en = p.poligon_travel_en,
            };
        }

        public static Directory_SpecialConditions GetSpecialConditions(this Directory_SpecialConditions s)
        {
            if (s == null) return null;
            return new Directory_SpecialConditions()
            {
                id = s.id,
                special_conditions_ru = s.special_conditions_ru,
                special_conditions_en = s.special_conditions_en,
            };
        }

        public static Directory_BorderCheckpoint GetDirectory_BorderCheckpoint(this Directory_BorderCheckpoint s)
        {
            if (s == null) return null;
            return new Directory_BorderCheckpoint()
            {
                code = s.code,
                station_name_ru = s.station_name_ru,
                station_name_en = s.station_name_en,
                code_inlandrailway = s.code_inlandrailway,
                Directory_InlandRailway = s.Directory_InlandRailway.GetDirectory_InlandRailway(),
                create = s.create,
                create_user = s.create_user,
                change = s.change,
                change_user = s.change_user
            };
        }

        public static Directory_Consignee GetDirectory_Consignee(this Directory_Consignee c)
        {
            if (c == null) return null;
            return new Directory_Consignee()
            {
                code = c.code,
                name = c.name,
                description = c.description,
                auxiliary = c.auxiliary,
            };
        }

        public static Directory_Shipper GetDirectory_Shipper(this Directory_Shipper s)
        {
            if (s == null) return null;
            return new Directory_Shipper()
            {
                code = s.code,
                shipper_name_ru = s.shipper_name_ru,
                shipper_name_en = s.shipper_name_en,
                create = s.create,
                create_user = s.create_user,
                change = s.change,
                change_user = s.change_user
            };
        }
        // Страны
        public static Directory_Countrys GetDirectory_Countrys(this Directory_Countrys c)
        {
            if (c == null) return null;
            return new Directory_Countrys()
            {
                id = c.id,
                code_sng = c.code_sng,
                code_europe = c.code_europe,
                code_iso = c.code_iso,
                countrys_name_ru = c.countrys_name_ru,
                countrys_name_en = c.countrys_name_en,
                country_abbr_ru = c.country_abbr_ru,
                country_abbr_en = c.country_abbr_en,
                create = c.create,
                create_user = c.create_user,
                change = c.change,
                change_user = c.change_user,
            };
        }
        // Ж. Дороги
        public static Directory_Railway GetDirectory_Railway(this Directory_Railway r)
        {
            if (r == null) return null;
            return new Directory_Railway()
            {
                code = r.code,
                railway_name_ru = r.railway_name_ru,
                railway_name_en = r.railway_name_en,
                railway_abbr_ru = r.railway_abbr_ru,
                railway_abbr_en = r.railway_abbr_en,
                id_countrys = r.id_countrys,
                Directory_Countrys = r.Directory_Countrys.GetDirectory_Countrys(),
                Directory_InlandRailway = r.Directory_InlandRailway.ToList().Select(i => new Directory_InlandRailway()
                {
                    code = r.code,
                    inlandrailway_name_ru = i.inlandrailway_name_ru,
                    inlandrailway_name_en = i.inlandrailway_name_en,
                    inlandrailway_abbr_ru = i.inlandrailway_abbr_ru,
                    inlandrailway_abbr_en = i.inlandrailway_abbr_en,
                    code_railway = i.code_railway,
                    //Directory_ExternalStation
                    create = r.create,
                    create_user = r.create_user,
                    change = r.change,
                    change_user = r.change_user
                }).ToList(),
                create = r.create,
                create_user = r.create_user,
                change = r.change,
                change_user = r.change_user
            };
        }
        // Внутрение ж. дороги
        public static Directory_InlandRailway GetDirectory_InlandRailway(this Directory_InlandRailway r)
        {
            if (r == null) return null;
            return new Directory_InlandRailway()
            {
                code = r.code,
                inlandrailway_name_ru = r.inlandrailway_name_ru,
                inlandrailway_name_en = r.inlandrailway_name_en,
                inlandrailway_abbr_ru = r.inlandrailway_abbr_ru,
                inlandrailway_abbr_en = r.inlandrailway_abbr_en,
                code_railway = r.code_railway,
                Directory_Railway = r.Directory_Railway.GetDirectory_Railway(),
                //Directory_ExternalStation
                create = r.create,
                create_user = r.create_user,
                change = r.change,
                change_user = r.change_user
            };
        }
        // Внешние станции
        public static Directory_ExternalStation GetDirectory_ExternalStation(this Directory_ExternalStation s)
        {
            if (s == null) return null;
            return new Directory_ExternalStation()
            {
                code = s.code,
                station_name_ru = s.station_name_ru,
                station_name_en = s.station_name_en,
                code_inlandrailway = s.code_inlandrailway,
                Directory_InlandRailway = s.Directory_InlandRailway.GetDirectory_InlandRailway(),
                create = s.create,
                create_user = s.create_user,
                change = s.change,
                change_user = s.change_user
            };
        }
        // Справочник ограничений
        public static Directory_LimitingLoading GetDirectory_LimitingLoading(this Directory_LimitingLoading l)
        {
            if (l == null) return null;
            return new Directory_LimitingLoading()
            {
                id = l.id,
                limiting_name_ru = l.limiting_name_ru,
                limiting_name_en = l.limiting_name_en,
                limiting_abbr_ru = l.limiting_abbr_ru,
                limiting_abbr_en = l.limiting_abbr_en,
                create = l.create,
                create_user = l.create_user,
                change = l.change,
                change_user = l.change_user
            };
        }
        // Справочник вагон
        public static Directory_Wagons GetDirectory_Wagons(this Directory_Wagons w)
        {
            if (w == null) return null;
            return new Directory_Wagons()
            {
                num = w.num,
                id_countrys = w.id_countrys,
                id_genus = w.id_genus,
                id_owner = w.id_owner,
                id_operator = w.id_operator,
                change_operator = w.change_operator,
                gruzp = w.gruzp,
                tara = w.tara,
                kol_os = w.kol_os,
                usl_tip = w.usl_tip,
                date_rem_uz = w.date_rem_uz,
                date_rem_vag = w.date_rem_vag,
                id_type_ownership = w.id_type_ownership,
                sign = w.sign,
                factory_number = w.factory_number,
                inventory_number = w.inventory_number,
                year_built = w.year_built,
                exit_ban = w.exit_ban,
                note = w.note,
                sobstv_kis = w.sobstv_kis,
                bit_warning = w.bit_warning,
                closed_route = w.closed_route,
                new_construction = w.new_construction,
                create = w.create,
                create_user = w.create_user,
                change = w.change,
                change_user = w.change_user,
                Directory_Countrys = w.Directory_Countrys.GetDirectory_Countrys(),
                Directory_GenusWagons = w.Directory_GenusWagons.GetGenusWagons(),
                Directory_OwnersWagons = w.Directory_OwnersWagons.GetOwnersWagons(),
                Directory_OperatorsWagons = w.Directory_OperatorsWagons.GetOperatorsWagons(),
                Directory_TypeOwnerShip = w.Directory_TypeOwnerShip.GetTypeOwnerShip(),
                Directory_WagonsRent = null,
            };
        }
        // Справочник вагонов новый.
        public static Directory_Wagons GetDirectory_Wagons_Directory_WagonsRent(this Directory_Wagons w)
        {
            if (w == null) return null;
            return new Directory_Wagons()
            {
                num = w.num,
                id_countrys = w.id_countrys,
                id_genus = w.id_genus,
                id_owner = w.id_owner,
                id_operator = w.id_operator,
                change_operator = w.change_operator,
                gruzp = w.gruzp,
                tara = w.tara,
                kol_os = w.kol_os,
                usl_tip = w.usl_tip,
                date_rem_uz = w.date_rem_uz,
                date_rem_vag = w.date_rem_vag,
                id_type_ownership = w.id_type_ownership,
                factory_number = w.factory_number,
                inventory_number = w.inventory_number,
                year_built = w.year_built,
                exit_ban = w.exit_ban,
                sign = w.sign,
                note = w.note,
                sobstv_kis = w.sobstv_kis,
                bit_warning = w.bit_warning,
                closed_route = w.closed_route,
                new_construction = w.new_construction,
                create = w.create,
                create_user = w.create_user,
                change = w.change,
                change_user = w.change_user,
                Directory_Countrys = w.Directory_Countrys.GetDirectory_Countrys(),
                Directory_GenusWagons = w.Directory_GenusWagons.GetGenusWagons(),
                Directory_OwnersWagons = w.Directory_OwnersWagons.GetOwnersWagons(),
                Directory_OperatorsWagons = w.Directory_OperatorsWagons.GetOperatorsWagons(),
                Directory_TypeOwnerShip = w.Directory_TypeOwnerShip.GetTypeOwnerShip(),
                Directory_WagonsRent = w.Directory_WagonsRent.ToList().Select(r => r.GetDirectory_WagonsRent()).ToList(),
            };
        }
        // Справочник аренд вагонов.
        public static Directory_WagonsRent GetDirectory_WagonsRent(this Directory_WagonsRent r)
        {
            if (r == null) return null;
            return new Directory_WagonsRent()
            {
                id = r.id,
                num = r.num,
                id_operator = r.id_operator,
                id_limiting = r.id_limiting,
                rent_start = r.rent_start,
                rent_end = r.rent_end,
                parent_id = r.parent_id,
                create = r.create,
                create_user = r.create_user,
                change = r.change,
                change_user = r.change_user,
                Directory_LimitingLoading = r.Directory_LimitingLoading.GetDirectory_LimitingLoading(),
                Directory_OperatorsWagons = r.Directory_OperatorsWagons.GetOperatorsWagons(),
                Directory_Wagons = r.Directory_Wagons.GetDirectory_Wagons(),
                Directory_WagonsRent1 = null,
                Directory_WagonsRent2 = null,
            };
        }
        // Справочник годность по прибытию
        public static Directory_ConditionArrival GetDirectory_ConditionArrival(this Directory_ConditionArrival c)
        {
            if (c == null) return null;
            return new Directory_ConditionArrival()
            {
                id = c.id,
                condition_name_ru = c.condition_name_ru,
                condition_name_en = c.condition_name_en,
                condition_abbr_ru = c.condition_abbr_ru,
                condition_abbr_en = c.condition_abbr_en,
                red = c.red,
                create = c.create,
                create_user = c.create_user,
                change = c.change,
                change_user = c.change_user,
                delete = c.delete,
                delete_user = c.delete_user,
            };
        }
        // Справочник годность по отправке
        public static Directory_PayerSender GetDirectory_PayerSender(this Directory_PayerSender p)
        {
            if (p == null) return null;
            return new Directory_PayerSender()
            {
                code = p.code,
                payer_name_ru = p.payer_name_ru,
                payer_name_en = p.payer_name_en,
                create = p.create,
                create_user = p.create_user,
                change = p.change,
                change_user = p.change_user,
            };
        }
        //// Справочник годность по прибытию
        //public static Directory_PayerArrival GetDirectory_PayerArrival(this Directory_PayerArrival p)
        //{
        //    if (p == null) return null;
        //    return new Directory_PayerArrival()
        //    {
        //        code = p.code,
        //        payer_name_ru = p.payer_name_ru,
        //        payer_name_en = p.payer_name_en,
        //        create = p.create,
        //        create_user = p.create_user,
        //        change = p.change,
        //        change_user = p.change_user,
        //    };
        //}
        // Справочник групп грузов
        public static Directory_CargoGroup GetDirectory_CargoGroup(this Directory_CargoGroup g)
        {
            if (g == null) return null;
            return new Directory_CargoGroup()
            {
                id = g.id,
                cargo_group_name_ru = g.cargo_group_name_ru,
                cargo_group_name_en = g.cargo_group_name_en,
                //Directory_Cargo
                create = g.create,
                create_user = g.create_user,
                change = g.change,
                change_user = g.change_user,
            };
        }
        // Справочник грузов ЕТСНГ
        public static Directory_CargoETSNG GetDirectory_CargoETSNG(this Directory_CargoETSNG c)
        {
            if (c == null) return null;
            return new Directory_CargoETSNG()
            {
                id = c.id,
                code = c.code,
                cargo_etsng_name_ru = c.cargo_etsng_name_ru,
                cargo_etsng_name_en = c.cargo_etsng_name_en,
                //Directory_Cargo
                create = c.create,
                create_user = c.create_user,
                change = c.change,
                change_user = c.change_user,
            };
        }
        // Справочник грузов ГНГ
        public static Directory_CargoGNG GetDirectory_CargoGNG(this Directory_CargoGNG c)
        {
            if (c == null) return null;
            return new Directory_CargoGNG()
            {
                id = c.id,
                code = c.code,
                cargo_gng_name_ru = c.cargo_gng_name_ru,
                cargo_gng_name_en = c.cargo_gng_name_en,
                //Directory_Cargo
                create = c.create,
                create_user = c.create_user,
                change = c.change,
                change_user = c.change_user,
            };
        }
        // Справочник грузов
        public static Directory_Cargo GetDirectory_Cargo(this Directory_Cargo c)
        {
            if (c == null) return null;
            return new Directory_Cargo()
            {
                id = c.id,
                id_group = c.id_group,
                id_cargo_etsng = c.id_cargo_etsng,
                cargo_name_ru = c.cargo_name_ru,
                cargo_name_en = c.cargo_name_en,
                code_sap = c.code_sap,
                Directory_CargoGroup = c.Directory_CargoGroup.GetDirectory_CargoGroup(),
                Directory_CargoETSNG = c.Directory_CargoETSNG.GetDirectory_CargoETSNG(),
                sending = c.sending,
                create = c.create,
                create_user = c.create_user,
                change = c.change,
                change_user = c.change_user,
            };
        }
        // Справочник сертификационные данные
        public static Directory_CertificationData GetDirectory_CertificationData(this Directory_CertificationData c)
        {
            if (c == null) return null;
            return new Directory_CertificationData()
            {
                id = c.id,
                certification_data_ru = c.certification_data_ru,
                certification_data_en = c.certification_data_en,
                create = c.create,
                create_user = c.create_user,
                change = c.change,
                change_user = c.change_user,
            };
        }
        // Справочник комерчиское состояние
        public static Directory_CommercialCondition GetDirectory_CommercialCondition(this Directory_CommercialCondition c)
        {
            if (c == null) return null;
            return new Directory_CommercialCondition()
            {
                id = c.id,
                commercial_condition_ru = c.commercial_condition_ru,
                commercial_condition_en = c.commercial_condition_en,
                create = c.create,
                create_user = c.create_user,
                change = c.change,
                change_user = c.change_user,
            };
        }
        // Справочник классы опасности
        public static Directory_HazardClass GetDirectory_HazardClass(this Directory_HazardClass c)
        {
            if (c == null) return null;
            return new Directory_HazardClass()
            {
                code = c.code,
                hazard_class_ru = c.hazard_class_ru,
                hazard_class_en = c.hazard_class_en,
                create = c.create,
                create_user = c.create_user,
                change = c.change,
                change_user = c.change_user,
            };
        }
        // Справочник типов подразделений
        public static Directory_TypeDivision GetDirectory_TypeDivision(this Directory_TypeDivision t)
        {
            if (t == null) return null;
            return new Directory_TypeDivision()
            {
                id = t.id,
                type_devisions_ru = t.type_devisions_ru,
                type_devisions_en = t.type_devisions_en,
                Directory_Divisions = null
            };
        }
        // Справочник типов подразделений
        public static Directory_TypeDivision GetDirectory_TypeDivision_Directory_Divisions(this Directory_TypeDivision t)
        {
            if (t == null) return null;
            return new Directory_TypeDivision()
            {
                id = t.id,
                type_devisions_ru = t.type_devisions_ru,
                type_devisions_en = t.type_devisions_en,
                Directory_Divisions = t.Directory_Divisions.ToList().Select(d => d.GetDirectory_Divisions()).ToList(),
            };
        }
        //Справочник подразделений
        public static Directory_Divisions GetDirectory_Divisions(this Directory_Divisions d)
        {
            if (d == null) return null;
            return new Directory_Divisions()
            {
                id = d.id,
                position = d.position,
                name_division_ru = d.name_division_ru,
                name_division_en = d.name_division_en,
                division_abbr_ru = d.division_abbr_ru,
                division_abbr_en = d.division_abbr_en,
                id_type_devision = d.id_type_devision,
                code = d.code,
                old = d.old,
                parent_id = d.parent_id,
                Directory_TypeDivision = d.Directory_TypeDivision.GetDirectory_TypeDivision(),
                Directory_Ways = null,
                Directory_Divisions1 = null,
                Directory_Divisions2 = null
            };
        }

        // Справочник статусов локомотивов
        public static Directory_LocomotiveStatus GetDirectory_LocomotiveStatus(this Directory_LocomotiveStatus s)
        {
            if (s == null) return null;
            return new Directory_LocomotiveStatus()
            {
                id = s.id,
                locomotive_status_ru = s.locomotive_status_ru,
                locomotive_status_en = s.locomotive_status_en,
                create = s.create,
                create_user = s.create_user,
                change = s.change,
                change_user = s.change_user,
                Directory_Locomotive = null,
            };
        }
        // Справочник локомотивов
        public static Directory_Locomotive GetDirectory_Locomotive(this Directory_Locomotive l)
        {
            if (l == null) return null;
            return new Directory_Locomotive()
            {
                locomotive = l.locomotive,
                id_locomotive_status = l.id_locomotive_status,
                factory_number = l.factory_number,
                inventory_number = l.inventory_number,
                note = l.note,
                create = l.create,
                create_user = l.create_user,
                change = l.change,
                change_user = l.change_user,
                Directory_LocomotiveStatus = l.Directory_LocomotiveStatus.GetDirectory_LocomotiveStatus(),
                WagonInternalOperation = null,
                WagonInternalOperation1 = null,
            };
        }
        // Справочник станций
        public static Directory_Station GetDirectory_Station(this Directory_Station s)
        {
            if (s == null) return null;
            return new Directory_Station()
            {
                id = s.id,
                station_name_ru = s.station_name_ru,
                station_name_en = s.station_name_en,
                station_abbr_ru = s.station_abbr_ru,
                station_abbr_en = s.station_abbr_en,
                exit_uz = s.exit_uz,
                station_uz = s.station_uz,
                default_side = s.default_side,
                code = s.code,
                idle_time = s.idle_time,
                Directory_Ways = null,
                //Directory_Ways = s.Directory_Ways.ToList().Select(w => w.GetDirectory_Ways()).ToList(),
                ArrivalSostav = null,
                ArrivalSostav1 = null,
                Arrival_UZ_Vagon = null,
                OutgoingSostav = null,
                OutgoingSostav1 = null
            };
        }
        // Справочник станций
        public static Directory_Station GetDirectory_Station_Directory_Ways(this Directory_Station s)
        {
            if (s == null) return null;
            return new Directory_Station()
            {
                id = s.id,
                station_name_ru = s.station_name_ru,
                station_name_en = s.station_name_en,
                station_abbr_ru = s.station_abbr_ru,
                station_abbr_en = s.station_abbr_en,
                exit_uz = s.exit_uz,
                station_uz = s.station_uz,
                default_side = s.default_side,
                code = s.code,
                idle_time = s.idle_time,
                Directory_Ways = s.Directory_Ways.ToList().Select(w => w.GetDirectory_Ways()).ToList(),
                ArrivalSostav = null,
                ArrivalSostav1 = null,
                Arrival_UZ_Vagon = null,
                OutgoingSostav = null,
                OutgoingSostav1 = null

            };
        }
        // Справочник парков
        public static Directory_ParkWays GetDirectory_ParkWays(this Directory_ParkWays p)
        {
            if (p == null) return null;
            return new Directory_ParkWays()
            {
                id = p.id,
                park_name_ru = p.park_name_ru,
                park_name_en = p.park_name_en,
                park_abbr_ru = p.park_abbr_ru,
                park_abbr_en = p.park_abbr_en,
                Directory_Ways = null,
                create = p.create,
                create_user = p.create_user,
                change = p.change,
                change_user = p.change_user,
            };
        }
        // Справочник парков
        public static Directory_ParkWays GetDirectory_ParkWays_Directory_Ways(this Directory_ParkWays p)
        {
            if (p == null) return null;
            return new Directory_ParkWays()
            {
                id = p.id,
                park_name_ru = p.park_name_ru,
                park_name_en = p.park_name_en,
                park_abbr_ru = p.park_abbr_ru,
                park_abbr_en = p.park_abbr_en,
                Directory_Ways = p.Directory_Ways.ToList().Select(w => w.GetDirectory_Ways()).ToList(),
                create = p.create,
                create_user = p.create_user,
                change = p.change,
                change_user = p.change_user,
            };
        }
        // Справочник путей
        public static Directory_Ways GetDirectory_Ways(this Directory_Ways w)
        {
            if (w == null) return null;
            return new Directory_Ways()
            {
                id = w.id,
                id_station = w.id_station,
                id_park = w.id_park,
                position_park = w.position_park,
                position_way = w.position_way,
                way_num_ru = w.way_num_ru,
                way_num_en = w.way_num_en,
                way_name_ru = w.way_name_ru,
                way_name_en = w.way_name_en,
                way_abbr_ru = w.way_abbr_ru,
                way_abbr_en = w.way_abbr_en,
                capacity = w.capacity,
                deadlock = w.deadlock,
                crossing_uz = w.crossing_uz,
                crossing_amkr = w.crossing_amkr,
                id_devision = w.id_devision,
                dissolution = w.dissolution,
                output_dissolution = w.output_dissolution,
                way_close = w.way_close,
                way_delete = w.way_delete,
                note = w.note,
                Directory_Station = w.Directory_Station.GetDirectory_Station(),
                Directory_ParkWays = w.Directory_ParkWays.GetDirectory_ParkWays(),
                ArrivalSostav = null,
                Directory_Divisions = w.Directory_Divisions.GetDirectory_Divisions(),
                create = w.create,
                create_user = w.create_user,
                change = w.change,
                change_user = w.change_user,
            };
        }
        // Справочник внешних путей
        public static Directory_OuterWays GetDirectory_OuterWays(this Directory_OuterWays w)
        {
            if (w == null) return null;
            return new Directory_OuterWays()
            {
                id = w.id,
                name_outer_way_ru = w.name_outer_way_ru,
                name_outer_way_en = w.name_outer_way_en,
                id_station_from = w.id_station_from,
                id_park_from = w.id_park_from,
                id_way_from = w.id_way_from,
                side_from = w.side_from,
                id_station_on = w.id_station_on,
                id_park_on = w.id_park_on,
                id_way_on = w.id_way_on,
                side_on = w.side_on,
                exit_uz = w.exit_uz,
                way_close = w.way_close,
                way_delete = w.way_delete,
                note = w.note,
                Directory_Station = w.Directory_Station.GetDirectory_Station(),
                Directory_ParkWays = w.Directory_ParkWays.GetDirectory_ParkWays(),
                Directory_Ways = w.Directory_Ways.GetDirectory_Ways(),
                Directory_Station1 = w.Directory_Station1.GetDirectory_Station(),
                Directory_ParkWays1 = w.Directory_ParkWays1.GetDirectory_ParkWays(),
                Directory_Ways1 = w.Directory_Ways1.GetDirectory_Ways(),
                create = w.create,
                create_user = w.create_user,
                change = w.change,
                change_user = w.change_user,
            };
        }
        // Справочник причин расхождений
        public static Directory_Reason_Discrepancy GetDirectory_Reason_Discrepancy(this Directory_Reason_Discrepancy d)
        {
            if (d == null) return null;
            return new Directory_Reason_Discrepancy()
            {
                id = d.id,
                reason_discrepancy_name_ru = d.reason_discrepancy_name_ru,
                reason_discrepancy_name_en = d.reason_discrepancy_name_en,
                create = d.create,
                create_user = d.create_user,
                change = d.change,
                change_user = d.change_user,
                delete = d.delete,
                delete_user = d.delete_user
            };
        }
        // Справочник причин возврата и задержания
        public static Directory_DetentionReturn GetDirectory_DetentionReturn(this Directory_DetentionReturn d)
        {
            if (d == null) return null;
            return new Directory_DetentionReturn()
            {
                id = d.id,
                cause_ru = d.cause_ru,
                cause_en = d.cause_en,
                create = d.create,
                create_user = d.create_user,
                change = d.change,
                change_user = d.change_user,
            };
        }

        #endregion

        #region MORG
        public static CardsWagons GetCardsWagons(this CardsWagons c)
        {
            if (c == null) return null;
            return new CardsWagons()
            {
                num = c.num,
                id_genus_wagon = c.id_genus_wagon,
                Directory_GenusWagons = GetGenusWagons(c.Directory_GenusWagons),
                id_state = c.id_state,
                id_wagon_manufacturer = c.id_wagon_manufacturer,
                Directory_WagonManufacturers = GetWagonManufacturers(c.Directory_WagonManufacturers),
                year_wagon_create = c.year_wagon_create,
                code_station = c.code_station,
                carrying_capacity = c.carrying_capacity,
                tara = c.tara,
                id_type_repairs = c.id_type_repairs,
                Directory_TypesRepairsWagons = GetTypesRepairsWagons(c.Directory_TypesRepairsWagons),
                date_type_repairs = c.date_type_repairs,
                code_model_wagon = c.code_model_wagon,
                Directory_ModelsWagons = GetModelsWagons(c.Directory_ModelsWagons),
                id_type_wagon = c.id_type_wagon,
                Directory_TypeWagons = GetTypeWagons(c.Directory_TypeWagons),
                axis_length = c.axis_length,
                body_volume = c.body_volume,
                id_type_ownership = c.id_type_ownership,
                Directory_TypeOwnerShip = GetTypeOwnerShip(c.Directory_TypeOwnerShip),
                id_owner_wagon = c.id_owner_wagon,
                Directory_OwnersWagons = GetOwnersWagons(c.Directory_OwnersWagons),
                date_registration = c.date_registration,
                id_lessor_wagon = c.id_lessor_wagon,
                Directory_LessorsWagons = GetLessorsWagons(c.Directory_LessorsWagons),
                id_operator_wagon = c.id_operator_wagon,
                Directory_OperatorsWagons = GetOperatorsWagons(c.Directory_OperatorsWagons),
                id_poligon_travel_wagon = c.id_poligon_travel_wagon,
                Directory_PoligonTravelWagons = GetPoligonTravelWagons(c.Directory_PoligonTravelWagons),
                id_special_conditions = c.id_special_conditions,
                Directory_SpecialConditions = GetSpecialConditions(c.Directory_SpecialConditions),
                sap = c.sap,
                note = c.note,
                create = c.create,
                create_user = c.create_user,
                change = c.change,
                change_user = c.change_user,
            };
        }

        public static WagonsMotionSignals GetWagonsMotionSignals(this WagonsMotionSignals w)
        {
            if (w == null) return null;
            return new WagonsMotionSignals()
            {
                id = w.id,
                id_wt = w.id_wt,
                nvagon = w.nvagon,
                st_disl = w.st_disl,
                nst_disl = w.nst_disl,
                kodop = w.kodop,
                nameop = w.nameop,
                full_nameop = w.full_nameop,
                dt = w.dt,
                st_form = w.st_form,
                nst_form = w.nst_form,
                idsost = w.idsost,
                nsost = w.nsost,
                st_nazn = w.st_nazn,
                nst_nazn = w.nst_nazn,
                ntrain = w.ntrain,
                st_end = w.st_end,
                nst_end = w.nst_end,
                kgr = w.kgr,
                nkgr = w.nkgr,
                id_cargo = w.id_cargo,
                kgrp = w.kgrp,
                ves = w.ves,
                updated = w.updated,
                kgro = w.kgro,
                km = w.km,
                station_from = w.station_from,
                station_end = w.station_end,
                route = w.route,
                shipper = w.shipper,
                consignee = w.consignee,
                location = w.location,
                condition = w.condition,
                type_flight = w.type_flight,
                start_flight = w.start_flight,
                start_turnover = w.start_turnover,
                duration_flight = w.duration_flight,
                duration_turnover = w.duration_turnover,
                note = w.note,
            };
        }
        #endregion

        #region RWT

        public static Arrival_UZ_Vagon_Pay GetArrival_UZ_Vagon_Pay(this Arrival_UZ_Vagon_Pay p)
        {
            if (p == null) return null;
            return new Arrival_UZ_Vagon_Pay()
            {
                id = p.id,
                id_vagon = p.id_vagon,
                kod = p.kod,
                summa = p.summa,
                Arrival_UZ_Vagon = null
            };
        }

        public static Arrival_UZ_Cont_Pay GetArrival_UZ_Cont_Pay(this Arrival_UZ_Cont_Pay p)
        {
            if (p == null) return null;
            return new Arrival_UZ_Cont_Pay()
            {
                id = p.id,
                id_cont = p.id_cont,
                kod = p.kod,
                summa = p.summa,
                Arrival_UZ_Vagon_Cont = null
            };
        }

        public static Arrival_UZ_Vagon_Cont GetArrival_UZ_Vagon_Cont(this Arrival_UZ_Vagon_Cont c)
        {
            if (c == null) return null;
            return new Arrival_UZ_Vagon_Cont()
            {
                id = c.id,
                id_vagon = c.id_vagon,
                nom_cont = c.nom_cont,
                kod_tiporazmer = c.kod_tiporazmer,
                gruzp = c.gruzp,
                ves_tary_arc = c.ves_tary_arc,
                id_cargo = c.id_cargo,
                id_cargo_gng = c.id_cargo_gng,
                kol_pac = c.kol_pac,
                pac = c.pac,
                vesg = c.vesg,
                vesg_reweighing = c.vesg_reweighing,
                nom_zpu = c.nom_zpu,
                Arrival_UZ_Cont_Pay = c.Arrival_UZ_Cont_Pay.ToList().Select(p => p.GetArrival_UZ_Cont_Pay()).ToList(),
                Directory_Cargo = c.Directory_Cargo.GetDirectory_Cargo(),
                Directory_CargoGNG = c.Directory_CargoGNG.GetDirectory_CargoGNG(),
                Arrival_UZ_Vagon = null
            };
        }

        public static Arrival_UZ_Vagon_Acts GetArrival_UZ_Vagon_Acts(this Arrival_UZ_Vagon_Acts a)
        {
            if (a == null) return null;
            return new Arrival_UZ_Vagon_Acts()
            {
                id = a.id,
                id_vagon = a.id_vagon,
                date_akt = a.date_akt,
                date_dved = a.date_dved,
                nom_akt = a.nom_akt,
                nom_dved = a.nom_dved,
                prichina_akt = a.prichina_akt,
                stn_akt = a.stn_akt,
                stn_name_akt = a.stn_name_akt,
                type = a.type,
                vagon_nom = a.vagon_nom,
                Arrival_UZ_Vagon = null
            };
        }

        public static Arrival_UZ_Vagon GetArrival_UZ_Vagon(this Arrival_UZ_Vagon v)
        {
            if (v == null) return null;
            return new Arrival_UZ_Vagon()
            {
                id = v.id,
                id_document = v.id_document,
                num = v.num,
                id_arrival = v.id_arrival,
                id_car = v.id_car,
                id_condition = v.id_condition,
                id_type = v.id_type,
                gruzp = v.gruzp,
                u_tara = v.u_tara,
                ves_tary_arc = v.ves_tary_arc,
                route = v.route,
                note_vagon = v.note_vagon,
                id_cargo = v.id_cargo,
                id_cargo_gng = v.id_cargo_gng,
                id_certification_data = v.id_certification_data,
                id_commercial_condition = v.id_commercial_condition,
                kol_pac = v.kol_pac,
                pac = v.pac,
                vesg = v.vesg,
                vesg_reweighing = v.vesg_reweighing,
                nom_zpu = v.nom_zpu,
                danger = v.danger,
                danger_kod = v.danger_kod,
                cargo_returns = v.cargo_returns,
                id_station_on_amkr = v.id_station_on_amkr,
                id_division_on_amkr = v.id_division_on_amkr,
                empty_car = v.empty_car,
                kol_conductor = v.kol_conductor,
                create = v.create,
                create_user = v.create_user,
                change = v.change,
                change_user = v.change_user,
                ArrivalSostav = null,
                Arrival_UZ_Document = null,
                Directory_Wagons = v.Directory_Wagons.GetDirectory_Wagons_Directory_WagonsRent(),
                Arrival_UZ_Vagon_Acts = v.Arrival_UZ_Vagon_Acts.ToList().Select(a => a.GetArrival_UZ_Vagon_Acts()).ToList(),
                Arrival_UZ_Vagon_Pay = v.Arrival_UZ_Vagon_Pay.ToList().Select(p => p.GetArrival_UZ_Vagon_Pay()).ToList(),
                Arrival_UZ_Vagon_Cont = v.Arrival_UZ_Vagon_Cont.ToList().Select(c => c.GetArrival_UZ_Vagon_Cont()).ToList(),
                Directory_Cargo = v.Directory_Cargo.GetDirectory_Cargo(),
                Directory_CargoGNG = v.Directory_CargoGNG.GetDirectory_CargoGNG(),
                Directory_CertificationData = v.Directory_CertificationData.GetDirectory_CertificationData(),
                Directory_CommercialCondition = v.Directory_CommercialCondition.GetDirectory_CommercialCondition(),
                Directory_ConditionArrival = v.Directory_ConditionArrival.GetDirectory_ConditionArrival(),
                Directory_HazardClass = v.Directory_HazardClass.GetDirectory_HazardClass(),
                Directory_Station = v.Directory_Station.GetDirectory_Station(),
                Directory_TypeWagons = v.Directory_TypeWagons.GetTypeWagons(),
                Directory_Divisions = v.Directory_Divisions.GetDirectory_Divisions()
            };
        }

        public static Arrival_UZ_Vagon GetArrival_UZ_Vagon_Arrival_UZ_Document(this Arrival_UZ_Vagon v)
        {
            try
            {
                if (v == null) return null;
                return new Arrival_UZ_Vagon()
                {
                    id = v.id,
                    id_document = v.id_document,
                    num = v.num,
                    id_arrival = v.id_arrival,
                    id_car = v.id_car,
                    id_condition = v.id_condition,
                    id_type = v.id_type,
                    gruzp = v.gruzp,
                    u_tara = v.u_tara,
                    ves_tary_arc = v.ves_tary_arc,
                    route = v.route,
                    note_vagon = v.note_vagon,
                    id_cargo = v.id_cargo,
                    id_cargo_gng = v.id_cargo_gng,
                    id_certification_data = v.id_certification_data,
                    id_commercial_condition = v.id_commercial_condition,
                    kol_pac = v.kol_pac,
                    pac = v.pac,
                    vesg = v.vesg,
                    vesg_reweighing = v.vesg_reweighing,
                    nom_zpu = v.nom_zpu,
                    danger = v.danger,
                    danger_kod = v.danger_kod,
                    cargo_returns = v.cargo_returns,
                    id_station_on_amkr = v.id_station_on_amkr,
                    id_division_on_amkr = v.id_division_on_amkr,
                    empty_car = v.empty_car,
                    kol_conductor = v.kol_conductor,
                    create = v.create,
                    create_user = v.create_user,
                    change = v.change,
                    change_user = v.change_user,
                    ArrivalSostav = null,
                    Arrival_UZ_Document = v.Arrival_UZ_Document.GetArrival_UZ_Document(),
                    Directory_Wagons = v.Directory_Wagons.GetDirectory_Wagons_Directory_WagonsRent(),
                    Arrival_UZ_Vagon_Acts = v.Arrival_UZ_Vagon_Acts.ToList().Select(a => a.GetArrival_UZ_Vagon_Acts()).ToList(),
                    Arrival_UZ_Vagon_Pay = v.Arrival_UZ_Vagon_Pay.ToList().Select(p => p.GetArrival_UZ_Vagon_Pay()).ToList(),
                    Arrival_UZ_Vagon_Cont = v.Arrival_UZ_Vagon_Cont.ToList().Select(c => c.GetArrival_UZ_Vagon_Cont()).ToList(),
                    Directory_Cargo = v.Directory_Cargo.GetDirectory_Cargo(),
                    Directory_CargoGNG = v.Directory_CargoGNG.GetDirectory_CargoGNG(),
                    Directory_CertificationData = v.Directory_CertificationData.GetDirectory_CertificationData(),
                    Directory_CommercialCondition = v.Directory_CommercialCondition.GetDirectory_CommercialCondition(),
                    Directory_ConditionArrival = v.Directory_ConditionArrival.GetDirectory_ConditionArrival(),
                    Directory_HazardClass = v.Directory_HazardClass.GetDirectory_HazardClass(),
                    Directory_Station = v.Directory_Station.GetDirectory_Station(),
                    Directory_TypeWagons = v.Directory_TypeWagons.GetTypeWagons(),
                    Directory_Divisions = v.Directory_Divisions.GetDirectory_Divisions()
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static Arrival_UZ_Document_Pay GetArrival_UZ_Document_Pay(this Arrival_UZ_Document_Pay p)
        {
            if (p == null) return null;
            return new Arrival_UZ_Document_Pay()
            {
                id = p.id,
                id_document = p.id_document,
                code_payer = p.code_payer,
                type_payer = p.type_payer,
                kod = p.kod,
                summa = p.summa,
                Arrival_UZ_Document = null,
            };
        }

        public static Arrival_UZ_Document_Docs GetArrival_UZ_Document_Docs(this Arrival_UZ_Document_Docs d)
        {
            if (d == null) return null;
            return new Arrival_UZ_Document_Docs()
            {
                id = d.id,
                id_document = d.id_document,
                id_doc = d.id_doc,
                description = d.description,
                doc_date = d.doc_date,
                doc_type = d.doc_type,
                doc_type_name = d.doc_type_name,
                doc = d.doc,
                Arrival_UZ_Document = null,
            };
        }

        public static Arrival_UZ_Document_Acts GetArrival_UZ_Document_Acts(this Arrival_UZ_Document_Acts a)
        {
            if (a == null) return null;
            return new Arrival_UZ_Document_Acts()
            {
                id = a.id,
                id_document = a.id_document,
                date_akt = a.date_akt,
                date_dved = a.date_dved,
                nom_akt = a.nom_akt,
                nom_dved = a.nom_dved,
                prichina_akt = a.prichina_akt,
                stn_akt = a.stn_akt,
                stn_name_akt = a.stn_name_akt,
                type = a.type,
                vagon_nom = a.vagon_nom,
                Arrival_UZ_Document = null
            };
        }

        public static Arrival_UZ_Document GetArrival_UZ_Document_Arrival_UZ_Vagon(this Arrival_UZ_Document d)
        {
            try
            {
                if (d == null) return null;
                return new Arrival_UZ_Document()
                {
                    id = d.id,
                    id_doc_uz = d.id_doc_uz,
                    nom_doc = d.nom_doc,
                    nom_main_doc = d.nom_main_doc,
                    //date_otpr = d.date_otpr,
                    //date_grpol = d.date_grpol,
                    //date_pr = d.date_pr,
                    //date_vid = d.date_vid,
                    //representative_pib = d.representative_pib,
                    //vid = d.vid,
                    code_stn_from = d.code_stn_from,
                    code_stn_to = d.code_stn_to,
                    code_border_checkpoint = d.code_border_checkpoint,
                    cross_time = d.cross_time,
                    code_shipper = d.code_shipper,
                    code_consignee = d.code_consignee,
                    klient = d.klient,
                    code_payer_sender = d.code_payer_sender,
                    code_payer_arrival = d.code_payer_arrival,
                    //osum = d.osum,
                    //sum_deliv = d.sum_deliv,
                    //iskl_tar = d.iskl_tar,
                    distance_way = d.distance_way,
                    //metod = d.metod,
                    //name_strah_komp_recipient = d.name_strah_komp_recipient,
                    //text_branch = d.text_branch,
                    //text_marks = d.text_marks,
                    //text_mount_chapter = d.text_mount_chapter,
                    //text_mount_para = d.text_mount_para,
                    //text_name_gr = d.text_name_gr,
                    //text_rw_note = d.text_rw_note,
                    //text_sing = d.text_sing,
                    //text_zayava = d.text_zayava,
                    note = d.note,
                    parent_id = d.parent_id,
                    create = d.create,
                    create_user = d.create_user,
                    change = d.change,
                    change_user = d.change_user,
                    UZ_DOC = d.UZ_DOC.GetUZ_DOC(),
                    Arrival_UZ_Vagon = d.Arrival_UZ_Vagon.ToList().Select(v => v.GetArrival_UZ_Vagon()).ToList(),
                    Arrival_UZ_Document1 = null,
                    Arrival_UZ_Document2 = null,
                    Directory_ExternalStation = d.Directory_ExternalStation.GetDirectory_ExternalStation(),
                    Directory_ExternalStation1 = d.Directory_ExternalStation1.GetDirectory_ExternalStation(),
                    Directory_BorderCheckpoint = d.Directory_BorderCheckpoint.GetDirectory_BorderCheckpoint(),
                    Directory_Shipper = d.Directory_Shipper.GetDirectory_Shipper(),
                    Directory_Consignee = d.Directory_Consignee.GetDirectory_Consignee(),
                    Directory_PayerSender = d.Directory_PayerSender.GetDirectory_PayerSender(),
                    //Directory_PayerArrival = d.Directory_PayerArrival.GetDirectory_PayerArrival(),
                    Arrival_UZ_Document_Acts = d.Arrival_UZ_Document_Acts.ToList().Select(a => a.GetArrival_UZ_Document_Acts()).ToList(),
                    Arrival_UZ_Document_Docs = d.Arrival_UZ_Document_Docs.ToList().Select(s => s.GetArrival_UZ_Document_Docs()).ToList(),
                    Arrival_UZ_Document_Pay = d.Arrival_UZ_Document_Pay.ToList().Select(p => p.GetArrival_UZ_Document_Pay()).ToList(),

                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static Arrival_UZ_Document GetArrival_UZ_Document(this Arrival_UZ_Document d)
        {
            try
            {
                if (d == null) return null;
                return new Arrival_UZ_Document()
                {
                    id = d.id,
                    id_doc_uz = d.id_doc_uz,
                    nom_doc = d.nom_doc,
                    nom_main_doc = d.nom_main_doc,
                    //date_otpr = d.date_otpr,
                    //date_grpol = d.date_grpol,
                    //date_pr = d.date_pr,
                    //date_vid = d.date_vid,
                    //representative_pib = d.representative_pib,
                    //vid = d.vid,
                    code_stn_from = d.code_stn_from,
                    code_stn_to = d.code_stn_to,
                    code_border_checkpoint = d.code_border_checkpoint,
                    cross_time = d.cross_time,
                    code_shipper = d.code_shipper,
                    code_consignee = d.code_consignee,
                    klient = d.klient,
                    code_payer_sender = d.code_payer_sender,
                    code_payer_arrival = d.code_payer_arrival,
                    //osum = d.osum,
                    //sum_deliv = d.sum_deliv,
                    //iskl_tar = d.iskl_tar,
                    distance_way = d.distance_way,
                    //metod = d.metod,
                    //name_strah_komp_recipient = d.name_strah_komp_recipient,
                    //text_branch = d.text_branch,
                    //text_marks = d.text_marks,
                    //text_mount_chapter = d.text_mount_chapter,
                    //text_mount_para = d.text_mount_para,
                    //text_name_gr = d.text_name_gr,
                    //text_rw_note = d.text_rw_note,
                    //text_sing = d.text_sing,
                    //text_zayava = d.text_zayava,
                    note = d.note,
                    parent_id = d.parent_id,
                    create = d.create,
                    create_user = d.create_user,
                    change = d.change,
                    change_user = d.change_user,
                    UZ_DOC = d.UZ_DOC.GetUZ_DOC(),
                    Arrival_UZ_Vagon = null,
                    Arrival_UZ_Document1 = null,
                    Arrival_UZ_Document2 = null,
                    Directory_ExternalStation = d.Directory_ExternalStation.GetDirectory_ExternalStation(),
                    Directory_ExternalStation1 = d.Directory_ExternalStation1.GetDirectory_ExternalStation(),
                    Directory_BorderCheckpoint = d.Directory_BorderCheckpoint.GetDirectory_BorderCheckpoint(),
                    Directory_Shipper = d.Directory_Shipper.GetDirectory_Shipper(),
                    Directory_Consignee = d.Directory_Consignee.GetDirectory_Consignee(),
                    Directory_PayerSender = d.Directory_PayerSender.GetDirectory_PayerSender(),
                    //Directory_PayerArrival = d.Directory_PayerArrival.GetDirectory_PayerArrival(),
                    Arrival_UZ_Document_Acts = d.Arrival_UZ_Document_Acts.ToList().Select(a => a.GetArrival_UZ_Document_Acts()).ToList(),
                    Arrival_UZ_Document_Docs = d.Arrival_UZ_Document_Docs.ToList().Select(s => s.GetArrival_UZ_Document_Docs()).ToList(),
                    Arrival_UZ_Document_Pay = d.Arrival_UZ_Document_Pay.ToList().Select(p => p.GetArrival_UZ_Document_Pay()).ToList(),

                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static ArrivalSostav GetArrivalSostav_ArrivalCars(this ArrivalSostav s)
        {
            try
            {
                if (s == null) return null;
                return new ArrivalSostav()
                {
                    id = s.id,
                    id_arrived = s.id_arrived,
                    id_sostav = s.id_sostav,
                    train = s.train,
                    composition_index = s.composition_index,
                    date_arrival = s.date_arrival,
                    date_adoption = s.date_adoption,
                    date_adoption_act = s.date_adoption_act,
                    id_station_from = s.id_station_from,
                    id_station_on = s.id_station_on,
                    id_way = s.id_way,
                    numeration = s.numeration,
                    num_doc = s.num_doc,
                    count = s.count,
                    status = s.status,
                    note = s.note,
                    create = s.create,
                    create_user = s.create_user,
                    change = s.change,
                    change_user = s.change_user,
                    ArrivalCars = s.ArrivalCars.ToList().Select(c => c.GetArrivalCars()).ToList(),
                    Arrival_UZ_Vagon = s.Arrival_UZ_Vagon.ToList().Select(c => c.GetArrival_UZ_Vagon()).ToList(),
                    Directory_Station = s.Directory_Station.GetDirectory_Station(),
                    Directory_Station1 = s.Directory_Station1.GetDirectory_Station(),
                    Directory_Ways = s.Directory_Ways.GetDirectory_Ways()
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static ArrivalSostav GetArrivalSostav(this ArrivalSostav s)
        {
            if (s == null) return null;
            return new ArrivalSostav()
            {
                id = s.id,
                id_arrived = s.id_arrived,
                id_sostav = s.id_sostav,
                train = s.train,
                composition_index = s.composition_index,
                date_arrival = s.date_arrival,
                date_adoption = s.date_adoption,
                date_adoption_act = s.date_adoption_act,
                id_station_from = s.id_station_from,
                id_station_on = s.id_station_on,
                id_way = s.id_way,
                numeration = s.numeration,
                num_doc = s.num_doc,
                count = s.count,
                status = s.status,
                note = s.note,
                create = s.create,
                create_user = s.create_user,
                change = s.change,
                change_user = s.change_user,
                Directory_Station = s.Directory_Station.GetDirectory_Station(),
                Directory_Station1 = s.Directory_Station1.GetDirectory_Station(),
                Directory_Ways = s.Directory_Ways.GetDirectory_Ways()
            };
        }

        public static ArrivalCars GetArrivalCars(this ArrivalCars c)
        {
            try
            {
                if (c == null) return null;
                return new ArrivalCars()
                {
                    id = c.id,
                    id_arrival = c.id_arrival,
                    num = c.num,
                    position = c.position,
                    position_arrival = c.position_arrival,
                    consignee = c.consignee,
                    num_doc = c.num_doc,
                    id_transfer = c.id_transfer,
                    note = c.note,
                    date_adoption_act = c.date_adoption_act,
                    id_arrival_uz_vagon = c.id_arrival_uz_vagon,
                    arrival = c.arrival,
                    arrival_user = c.arrival_user,
                    create = c.create,
                    create_user = c.create_user,
                    change = c.change,
                    change_user = c.change_user,
                    UZ_DOC = c.UZ_DOC.GetUZ_DOC(),
                    Arrival_UZ_Vagon = c.Arrival_UZ_Vagon.GetArrival_UZ_Vagon_Arrival_UZ_Document()
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static ArrivalCars GetArrivalCars_ArrivalSostav(this ArrivalCars c)
        {
            if (c == null) return null;
            return new ArrivalCars()
            {
                id = c.id,
                id_arrival = c.id_arrival,
                num = c.num,
                position = c.position,
                position_arrival = c.position_arrival,
                consignee = c.consignee,
                num_doc = c.num_doc,
                id_transfer = c.id_transfer,
                note = c.note,
                date_adoption_act = c.date_adoption_act,
                arrival = c.arrival,
                arrival_user = c.arrival_user,
                create = c.create,
                create_user = c.create_user,
                change = c.change,
                change_user = c.change_user,
                UZ_DOC = c.UZ_DOC.GetUZ_DOC(),
                ArrivalSostav = c.ArrivalSostav.GetArrivalSostav(),
                Arrival_UZ_Vagon = c.Arrival_UZ_Vagon.GetArrival_UZ_Vagon_Arrival_UZ_Document()
            };
        }

        public static UZ_DOC GetUZ_DOC(this UZ_DOC d)
        {
            if (d == null) return null;
            return new UZ_DOC()
            {
                num_doc = d.num_doc,
                revision = d.revision,
                num_uz = d.num_uz,
                status = d.status,
                code_from = d.code_from,
                code_on = d.code_on,
                dt = d.dt,
                xml_doc = d.xml_doc,
            };
        }

        public static SAPIncomingSupply GetSAPIncomingSupply(this SAPIncomingSupply s)
        {
            try
            {
                if (s == null) return null;
                return new SAPIncomingSupply()
                {
                    id = s.id,
                    id_arrival_car = s.id_arrival_car,
                    num = s.num,
                    num_doc_uz = s.num_doc_uz,
                    date_doc_uz = s.date_doc_uz,
                    code_border_checkpoint = s.code_border_checkpoint,
                    name_border_checkpoint = s.name_border_checkpoint,
                    cross_time = s.cross_time,
                    VBELN = s.VBELN,
                    NUM_VBELN = s.NUM_VBELN,
                    WERKS = s.WERKS,
                    LGORT = s.LGORT,
                    LGOBE = s.LGOBE,
                    ERDAT = s.ERDAT,
                    ETIME = s.ETIME,
                    LGORT_10 = s.LGORT_10,
                    LGOBE_10 = s.LGOBE_10,
                    MATNR = s.MATNR,
                    MAKTX = s.MAKTX,
                    NAME_SH = s.NAME_SH,
                    KOD_R_10 = s.KOD_R_10,
                    note = s.note,
                    term = s.term,
                    attempt = s.attempt,
                    create = s.create,
                    create_user = s.create_user,
                    change = s.change,
                    change_user = s.change_user,
                    close = s.close,
                    close_user = s.close_user,
                    ArrivalCars = null
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static OutgoingSostav GetOutgoingSostav(this OutgoingSostav s)
        {
            try
            {
                if (s == null) return null;
                return new OutgoingSostav()
                {
                    id = s.id,
                    num_doc = s.num_doc,
                    id_station_from = s.id_station_from,
                    id_way_from = s.id_way_from,
                    id_station_on = s.id_station_on,
                    date_readiness_amkr = s.date_readiness_amkr,
                    date_show_wagons = s.date_show_wagons,
                    date_readiness_uz = s.date_readiness_uz,
                    date_outgoing = s.date_outgoing,
                    date_outgoing_act = s.date_outgoing_act,
                    composition_index = s.composition_index,
                    status = s.status,
                    note = s.note,
                    create = s.create,
                    create_user = s.create_user,
                    change = s.change,
                    change_user = s.change_user,
                    OutgoingCars = null,
                    Directory_Station = s.Directory_Station.GetDirectory_Station(),
                    Directory_Station1 = s.Directory_Station1.GetDirectory_Station(),
                    Directory_Ways = s.Directory_Ways.GetDirectory_Ways()
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static OutgoingSostav GetOutgoingSostav_OutgoingCars(this OutgoingSostav s)
        {
            try
            {
                if (s == null) return null;
                return new OutgoingSostav()
                {
                    id = s.id,
                    num_doc = s.num_doc,
                    id_station_from = s.id_station_from,
                    id_way_from = s.id_way_from,
                    id_station_on = s.id_station_on,
                    date_readiness_amkr = s.date_readiness_amkr,
                    date_show_wagons = s.date_show_wagons,
                    date_readiness_uz = s.date_readiness_uz,
                    date_outgoing = s.date_outgoing,
                    date_outgoing_act = s.date_outgoing_act,
                    composition_index = s.composition_index,
                    status = s.status,
                    note = s.note,
                    create = s.create,
                    create_user = s.create_user,
                    change = s.change,
                    change_user = s.change_user,
                    OutgoingCars = s.OutgoingCars.ToList().Select(c => c.GetOutgoingCars()).ToList(),
                    Directory_Station = s.Directory_Station.GetDirectory_Station(),
                    Directory_Station1 = s.Directory_Station1.GetDirectory_Station(),
                    Directory_Ways = s.Directory_Ways.GetDirectory_Ways()
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static OutgoingCars GetOutgoingCars(this OutgoingCars c)
        {
            try
            {
                if (c == null) return null;
                return new OutgoingCars()
                {
                    id = c.id,
                    id_outgoing = c.id_outgoing,
                    num = c.num,
                    position = c.position,
                    position_outgoing = c.position_outgoing,
                    num_doc = c.num_doc,
                    note = c.note,
                    date_outgoing_act = c.date_outgoing_act,
                    outgoing = c.outgoing,
                    outgoing_user = c.outgoing_user,
                    create = c.create,
                    create_user = c.create_user,
                    change = c.change,
                    change_user = c.change_user,
                    id_outgoing_uz_vagon = c.id_outgoing_uz_vagon,
                    id_outgoing_detention_return = c.id_outgoing_detention_return, 
                    id_reason_discrepancy_amkr = c.id_reason_discrepancy_amkr, 
                    id_reason_discrepancy_uz = c.id_reason_discrepancy_uz,
                    OutgoingDetentionReturn = c.OutgoingDetentionReturn.GetOutgoingDetentionReturn(),
                    UZ_DOC_OUT = c.UZ_DOC_OUT.GetUZ_DOC_OUT(),
                    Directory_Wagons = c.Directory_Wagons.GetDirectory_Wagons_Directory_WagonsRent(),
                    OutgoingSostav = null,
                    //WagonInternalRoutes = c.WagonInternalRoutes.ToList().Select(w => w.GetWagonInternalRoutes()).ToList(),
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static OutgoingCars GetOutgoingCars_OutgoingSostav(this OutgoingCars c)
        {
            try
            {
                if (c == null) return null;
                return new OutgoingCars()
                {
                    id = c.id,
                    id_outgoing = c.id_outgoing,
                    num = c.num,
                    position = c.position,
                    position_outgoing = c.position_outgoing,
                    num_doc = c.num_doc,
                    note = c.note,
                    date_outgoing_act = c.date_outgoing_act,
                    outgoing = c.outgoing,
                    outgoing_user = c.outgoing_user,
                    create = c.create,
                    create_user = c.create_user,
                    change = c.change,
                    change_user = c.change_user,
                    id_outgoing_uz_vagon = c.id_outgoing_uz_vagon,
                    id_outgoing_detention_return = c.id_outgoing_detention_return,
                    id_reason_discrepancy_amkr = c.id_reason_discrepancy_amkr,
                    id_reason_discrepancy_uz = c.id_reason_discrepancy_uz,
                    UZ_DOC_OUT = c.UZ_DOC_OUT.GetUZ_DOC_OUT(),
                    Directory_Wagons = c.Directory_Wagons.GetDirectory_Wagons_Directory_WagonsRent(),
                    OutgoingSostav = c.OutgoingSostav.GetOutgoingSostav(),
                    //WagonInternalRoutes = c.WagonInternalRoutes.ToList().Select(w => w.GetWagonInternalRoutes()).ToList(),
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static OutgoingDetentionReturn GetOutgoingDetentionReturn(this OutgoingDetentionReturn o)
        {
            try
            {
                if (o == null) return null;
                return new OutgoingDetentionReturn()
                {
                    id = o.id,
                    num = o.num,
                    id_detention_return = o.id_detention_return,
                    type_detention_return = o.type_detention_return,
                    date_start = o.date_start,
                    date_stop = o.date_stop,
                    num_act = o.num_act,
                    date_act = o.date_act,
                    note = o.note,
                    create = o.create,
                    create_user = o.create_user,
                    change = o.change,
                    change_user = o.change_user,
                    Directory_DetentionReturn = o.Directory_DetentionReturn.GetDirectory_DetentionReturn()
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static UZ_DOC_OUT GetUZ_DOC_OUT(this UZ_DOC_OUT d)
        {
            if (d == null) return null;
            return new UZ_DOC_OUT()
            {
                num_doc = d.num_doc,
                revision = d.revision,
                num_uz = d.num_uz,
                status = d.status,
                code_from = d.code_from,
                code_on = d.code_on,
                dt = d.dt,
                xml_doc = d.xml_doc,
            };
        }

        public static InstructionalLettersWagon GetInstructionalLettersWagon(this InstructionalLettersWagon w)
        {
            if (w == null) return null;
            return new InstructionalLettersWagon()
            {
                id = w.id,
                id_instructional_letters = w.id_instructional_letters,
                num = w.num,
                close = w.close,
                close_status = w.close_status,
                note = w.note,
                create = w.create,
                create_user = w.create_user,
                change = w.change,
                change_user = w.change_user,
                InstructionalLetters = null,
            };
        }

        public static InstructionalLetters GetInstructionalLetters(this InstructionalLetters l)
        {
            if (l == null) return null;
            return new InstructionalLetters()
            {
                id = l.id,
                num = l.num,
                dt = l.dt,
                owner = l.owner,
                destination_station = l.destination_station,
                note = l.note,
                create = l.create,
                create_user = l.create_user,
                change = l.change,
                change_user = l.change_user,
                InstructionalLettersWagon = l.InstructionalLettersWagon.ToList().Select(c => c.GetInstructionalLettersWagon()).ToList(),
            };
        }

        public static ParkState_Station GetParkState_Station(this ParkState_Station p)
        {
            if (p == null) return null;
            return new ParkState_Station()
            {
                id = p.id,
                id_station = p.id_station,
                state_on = p.state_on,
                note = p.note,
                create = p.create,
                create_user = p.create_user,
                change = p.change,
                change_user = p.change_user,
                delete = p.delete,
                delete_user = p.delete_user,
                applied = p.applied,
                applied_user = p.applied_user,
                ParkState_Way = null

            };
        }

        #region Внутренее перемещение

        public static WagonInternalRoutes GetWagonInternalRoutes(this WagonInternalRoutes r)
        {
            if (r == null) return null;
            return new WagonInternalRoutes()
            {
                id = r.id,
                num = r.num,
                id_arrival_car = r.id_arrival_car,
                id_sap_incoming_supply = r.id_sap_incoming_supply,
                doc_outgoing_car = r.doc_outgoing_car,
                id_outgoing_car = r.id_outgoing_car,
                id_sap_outbound_supply = r.id_sap_outbound_supply,
                note = r.note,
                create = r.create,
                create_user = r.create_user,
                close = r.close,
                close_user = r.close_user,
                parent_id = r.parent_id,
                ArrivalCars = r.ArrivalCars.GetArrivalCars_ArrivalSostav(),
                Directory_Wagons = r.Directory_Wagons.GetDirectory_Wagons_Directory_WagonsRent(),
                OutgoingCars = r.OutgoingCars.GetOutgoingCars_OutgoingSostav(),
                SAPIncomingSupply = r.SAPIncomingSupply.GetSAPIncomingSupply(),
                WagonInternalOperation = r.WagonInternalOperation.ToList().Select(w => w.GetWagonInternalOperation()).ToList(),

            };
        }

        public static WagonInternalOperation GetWagonInternalOperation(this WagonInternalOperation o)
        {
            if (o == null) return null;
            return new WagonInternalOperation()
            {
                id = o.id,
                id_wagon_internal_routes = o.id_wagon_internal_routes,
                id_operation = o.id_operation,
                operation_start = o.operation_start,
                operation_end = o.operation_end,
                id_condition = o.id_condition,
                id_loading_status = o.id_loading_status,
                locomotive1 = o.locomotive1,
                locomotive2 = o.locomotive2,
                note = o.note,
                create = o.create,
                create_user = o.create_user,
                close = o.close,
                close_user = o.close_user,
                parent_id = o.parent_id,
                Directory_ConditionArrival = o.Directory_ConditionArrival.GetDirectory_ConditionArrival(),
                //Directory_Locomotive 
                //Directory_Locomotive1
                //Directory_WagonLoadingStatus
                //Directory_WagonOperations  


            };
        }

        #endregion


        #endregion
    }
}
