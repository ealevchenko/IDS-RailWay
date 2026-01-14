namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_BankRate")]
    public partial class Directory_BankRate
    {
        public int id { get; set; }

        public DateTime date { get; set; }

        public int code { get; set; }

        [Required]
        [StringLength(100)]
        public string name { get; set; }

        public float rate { get; set; }

        [Required]
        [StringLength(3)]
        public string cc { get; set; }
    }
}
