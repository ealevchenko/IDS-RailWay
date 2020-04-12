namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_CargoGNG")]
    public partial class Directory_CargoGNG
    {
        public int id { get; set; }

        public int code { get; set; }

        [Required]
        [StringLength(250)]
        public string cargo_gng_name_ru { get; set; }

        [Required]
        [StringLength(250)]
        public string cargo_gng_name_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }
    }
}
