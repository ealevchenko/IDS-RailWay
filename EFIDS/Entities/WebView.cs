namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.WebView")]
    public partial class WebView
    {
        [Key]
        [StringLength(100)]
        public string name { get; set; }

        [StringLength(100)]
        public string description { get; set; }

        public string roles { get; set; }

        public string users { get; set; }
    }
}
