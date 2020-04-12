namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Cargo")]
    public partial class Directory_Cargo
    {
        public int id { get; set; }

        public int id_group { get; set; }

        public int code_etsng { get; set; }

        public int? code_gng { get; set; }

        [Required]
        [StringLength(50)]
        public string cargo_name_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string cargo_name_en { get; set; }

        [StringLength(20)]
        public string code_sap { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual Directory_CargoETSNG Directory_CargoETSNG { get; set; }

        public virtual Directory_CargoGNG Directory_CargoGNG { get; set; }

        public virtual Directory_CargoGroup Directory_CargoGroup { get; set; }
    }
}
