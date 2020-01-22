namespace EFLOG.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LOGS.WebVisit")]
    public partial class WebVisit
    {
        public long id { get; set; }

        public DateTime date_time { get; set; }

        [StringLength(50)]
        public string user_name { get; set; }

        public bool? authentication { get; set; }

        [StringLength(50)]
        public string authentication_type { get; set; }

        [StringLength(50)]
        public string user_host_name { get; set; }

        [StringLength(50)]
        public string user_host_address { get; set; }

        [StringLength(1000)]
        public string url { get; set; }

        [StringLength(1000)]
        public string physical_path { get; set; }

        [StringLength(100)]
        public string areas { get; set; }

        [StringLength(100)]
        public string controller { get; set; }

        [StringLength(100)]
        public string action { get; set; }

        [StringLength(1000)]
        public string roles_access { get; set; }

        public bool? access { get; set; }
    }
}
