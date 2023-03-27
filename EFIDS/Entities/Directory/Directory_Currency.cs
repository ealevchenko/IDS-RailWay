namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Currency")]
    public partial class Directory_Currency
    {
        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string currency_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string currency_en { get; set; }

        public int code { get; set; }

        [Required]
        [StringLength(3)]
        public string code_cc { get; set; }
    }
}
