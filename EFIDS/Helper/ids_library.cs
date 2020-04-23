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
                local_use = o.local_use
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
        // Справочник вагонов
        public static Directory_Cars GetDirectory_Cars(this Directory_Cars c)
        {
            if (c == null) return null;
            return new Directory_Cars()
            {
                id = c.id,
                num = c.num,
                id_countrys = c.id_countrys,
                id_genus = c.id_genus,
                id_owner = c.id_owner,
                ban_changes_operator = c.ban_changes_operator,
                id_operator = c.id_operator,
                gruzp = c.gruzp,
                kol_os = c.kol_os,
                usl_tip = c.usl_tip,
                date_rem_uz = c.date_rem_uz,
                date_rem_vag = c.date_rem_vag,
                id_limiting = c.id_limiting,
                id_type_ownership = c.id_type_ownership,
                rent_start = c.rent_start,
                rent_end = c.rent_end,
                note = c.note,
                sobstv_kis = c.sobstv_kis,
                create = c.create,
                create_user = c.create_user,
                change = c.change,
                change_user = c.change_user,
                Directory_Countrys = c.Directory_Countrys.GetDirectory_Countrys(),
                Directory_GenusWagons = c.Directory_GenusWagons.GetGenusWagons(),
                Directory_OwnersWagons = c.Directory_OwnersWagons.GetOwnersWagons(),
                Directory_OperatorsWagons = c.Directory_OperatorsWagons.GetOperatorsWagons(),
                Directory_LimitingLoading = c.Directory_LimitingLoading.GetDirectory_LimitingLoading(),
                Directory_TypeOwnerShip = c.Directory_TypeOwnerShip.GetTypeOwnerShip(),
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
            };
        }
        // Справочник годность по прибытию
        public static Directory_PayerArrival GetDirectory_PayerArrival(this Directory_PayerArrival p)
        {
            if (p == null) return null;
            return new Directory_PayerArrival()
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
        public static ArrivalSostav GetArrivalSostav(this ArrivalSostav s)
        {
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
                num_doc = s.num_doc,
                count = s.count,
                status = s.status,
                note = s.note,
                create = s.create,
                create_user = s.create_user,
                change = s.change,
                change_user = s.change_user,
                ArrivalCars = s.ArrivalCars.ToList().Select(c => c.GetArrivalCars()).ToList(),
                Directory_Station = s.Directory_Station.GetDirectory_Station(),
                Directory_Station1 = s.Directory_Station1.GetDirectory_Station()
            };
        }

        public static ArrivalCars GetArrivalCars(this ArrivalCars c)
        {
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
            };
        }

        public static UZ_DOC GetUZ_DOC(this UZ_DOC d)
        {
            if (d == null) return null;
            return new UZ_DOC()
            {
                num_doc = d.num_doc,
                revision = d.revision,
                status = d.status,
                code_from = d.code_from,
                code_on = d.code_on,
                dt = d.dt,
                xml_doc = d.xml_doc,
            };
        }
        #endregion
    }
}
