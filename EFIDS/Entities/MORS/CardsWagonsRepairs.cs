namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.CardsWagonsRepairs")]
    public partial class CardsWagonsRepairs
    {
        public int id { get; set; }

        public int num { get; set; }

        public int id_type_repair_wagon { get; set; }

        public DateTime? date_repair { get; set; }

        public int? id_internal_railroad { get; set; }

        public int? code_depo { get; set; }

        public DateTime? date_non_working { get; set; }

        public int? id_wagons_condition { get; set; }

        [StringLength(500)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime change { get; set; }

        [Required]
        [StringLength(50)]
        public string change_user { get; set; }

        public virtual CardsWagons CardsWagons { get; set; }

        public virtual Directory_DEPO Directory_DEPO { get; set; }

        public virtual Directory_TypesRepairsWagons Directory_TypesRepairsWagons { get; set; }

        public virtual Directory_WagonsCondition Directory_WagonsCondition { get; set; }
    }
}
