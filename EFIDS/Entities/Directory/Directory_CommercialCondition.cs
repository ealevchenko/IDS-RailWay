namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_CommercialCondition")]
    public partial class Directory_CommercialCondition
    {
        public int id { get; set; }

        [Column("commercial condition_ru")]
        [Required]
        [StringLength(50)]
        public string commercial_condition_ru { get; set; }

        [Column("commercial condition_en")]
        [Required]
        [StringLength(50)]
        public string commercial_condition_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }
    }
}
