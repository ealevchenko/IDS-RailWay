using EFIDS.Abstract;
using EFIDS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.ModelBinding;

namespace WEB_UI.Controllers.api
{

    /// <summary>
    /// СПИСОК ВАГОНОВ ПАРКА ВАГОНОВ
    /// </summary>
    [RoutePrefix("api/ids/mors/park_list_wagons")]
    public class IDS_ParksListWagonsController : ApiController
    {
        protected IRepository<ParksListWagons> ef_park;

        public IDS_ParksListWagonsController(IRepository<ParksListWagons> park)
        {
            this.ef_park = park;
        }

        public string IntsToString(int[] source, char sep)
        {
            if (source == null) return null;
            string list = "";
            foreach (int i in source)
            {
                list += i.ToString() + sep;
            }
            if (!String.IsNullOrWhiteSpace(list)) { return list.Remove(list.Length - 1); } else { return null; }
        }

        #region

        private Directory_GenusWagons GetGenusWagons(Directory_GenusWagons g)
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

        private Directory_WagonManufacturers GetWagonManufacturers(Directory_WagonManufacturers g)
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

        private Directory_TypesRepairsWagons GetTypesRepairsWagons(Directory_TypesRepairsWagons g)
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

        private Directory_ModelsWagons GetModelsWagons(Directory_ModelsWagons m)
        {
            if (m == null) return null;
            return new Directory_ModelsWagons()
            {
                code = m.code,
                model_ru = m.model_ru,
                model_en = m.model_en
            };
        }

        private Directory_TypeWagons GetTypeWagons(Directory_TypeWagons t)
        {
            if (t == null) return null;
            return new Directory_TypeWagons()
            {
                id = t.id,
                type_ru = t.type_ru,
                type_en = t.type_en,

            };
        }

        private Directory_TypeOwnerShip GetTypeOwnerShip(Directory_TypeOwnerShip t)
        {
            if (t == null) return null;
            return new Directory_TypeOwnerShip()
            {
                id = t.id,
                type_ownership_ru = t.type_ownership_ru,
                type_ownership_en = t.type_ownership_en,
            };
        }

        private Directory_OwnersWagons GetOwnersWagons(Directory_OwnersWagons o)
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

        private Directory_LessorsWagons GetLessorsWagons(Directory_LessorsWagons l)
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

        private Directory_OperatorsWagons GetOperatorsWagons(Directory_OperatorsWagons o)
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

        private Directory_PoligonTravelWagons GetPoligonTravelWagons(Directory_PoligonTravelWagons p)
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

        private Directory_SpecialConditions GetSpecialConditions(Directory_SpecialConditions s)
        {
            if (s == null) return null;
            return new Directory_SpecialConditions()
            {
                id = s.id,
                special_conditions_ru = s.special_conditions_ru,
                special_conditions_en = s.special_conditions_en,
            };
        }

        private CardsWagons GetCardsWagons(CardsWagons c)
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

        // GET: api/ids/mors/park_list_wagons/all
        [Route("all")]
        [ResponseType(typeof(ParksListWagons))]
        public IHttpActionResult GetParksListWagons()
        {
            try
            {
                List<ParksListWagons> list = this.ef_park.Context.ToList()
                    .Select(l => new ParksListWagons
                    {
                        id = l.id,
                        id_park_wagon = l.id_park_wagon,
                        num = l.num
                    }).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/mors/park_list_wagons/id/3238
        [Route("id/{id:int}")]
        [ResponseType(typeof(ParksListWagons))]
        public IHttpActionResult GetParksListWagons(int id)
        {
            try
            {
                ParksListWagons wagon = this.ef_park
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(l => new ParksListWagons
                    {
                        id = l.id,
                        id_park_wagon = l.id_park_wagon,
                        num = l.num, 
                        CardsWagons = GetCardsWagons(l.CardsWagons),

                    }).FirstOrDefault();
                return Ok(wagon);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // GET: api/ids/mors/park_list_wagons/park/id/21
        [Route("park/id/{id:int}")]
        [ResponseType(typeof(ParksListWagons))]
        public IHttpActionResult GetParksListWagonsOfPark(int id)
        {
            try
            {
                List<ParksListWagons> list = this.ef_park
                    .Context
                    .Where(l => l.id_park_wagon == id)
                    .ToList()
                    .Select(l => new ParksListWagons
                    {
                        id = l.id,
                        id_park_wagon = l.id_park_wagon,
                        num = l.num,
                        CardsWagons = GetCardsWagons(l.CardsWagons),
                    }).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/mors/park_list_wagons/
        [HttpPost]
        [Route("")]
        public int PostParksListWagons([FromBody]ParksListWagons value)
        {
            try
            {
                this.ef_park.Add(value);
                this.ef_park.Save();
                this.ef_park.Refresh(value);
                return value.id;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/mors/park_list_wagons/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutParksListWagons(int id, [FromBody]ParksListWagons value)
        {
            try
            {
                this.ef_park.Update(value);
                return this.ef_park.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/mors/park_list_wagons/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteParksListWagons(int id)
        {
            try
            {
                this.ef_park.Delete(id);
                return this.ef_park.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/mors/park_list_wagons/list
        [HttpPost]
        [Route("list")]
        public int PostDelParksListWagons([ModelBinder]object[] list)
        {
            try
            {
                //string nums = IntsToString(list, ',');
                string nums = "";
                return this.ef_park.Database.ExecuteSqlCommand("delete [KRR-PA-CNT-Railway].[IDS].[ParksListWagons] where in("+ nums + ")");
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
