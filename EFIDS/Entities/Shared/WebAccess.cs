namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.WebAccess")]
    public partial class WebAccess
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(100)]
        public string areas { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(100)]
        public string controller { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(100)]
        public string action { get; set; }

        [StringLength(100)]
        public string description { get; set; }

        public string roles { get; set; }

        public string users { get; set; }
    }
}
