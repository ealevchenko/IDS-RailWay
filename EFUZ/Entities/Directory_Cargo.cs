namespace EFUZ.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("UZ.Directory_Cargo")]
    public partial class Directory_Cargo
    {
        [Key]
        public int id { get; set; }

        [Index]
        public int code_etsng { get; set; }

        [Required]
        [StringLength(250)]
        public string name_etsng { get; set; }

        public int code_gng { get; set; }

        [Required]
        [StringLength(250)]
        public string name_gng { get; set; }

        public int? id_sap { get; set; }
    }
}
