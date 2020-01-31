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
        #region

        public static Directory_GenusWagons GetGenusWagons(Directory_GenusWagons g)
        {
            return new Directory_GenusWagons()
            {
                id = g.id,
                abbr_ru = g.abbr_ru,
                genus_ru = g.genus_ru,
                abbr_en = g.abbr_en,
                genus_en = g.genus_en,
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

        #endregion
    }
}
