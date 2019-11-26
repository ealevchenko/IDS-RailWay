namespace EFLOG.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LOGS.Logs")]
    public partial class Logs
    {
        public long id { get; set; }

        public DateTime date_time { get; set; }

        [StringLength(50)]
        public string user_name { get; set; }

        [StringLength(50)]
        public string user_host_name { get; set; }

        [StringLength(50)]
        public string user_host_address { get; set; }

        [StringLength(1000)]
        public string physical_path { get; set; }

        public int? service { get; set; }

        public int? event_id { get; set; }

        public int? level { get; set; }

        public string message { get; set; }
    }
}
