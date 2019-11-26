namespace EFLOG.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LOGS.Events")]
    public partial class Events
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

        [Column("event")]
        public string _event { get; set; }

        [StringLength(2000)]
        public string status { get; set; }
    }
}
