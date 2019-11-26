namespace EFLOG.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LOGS.Errors")]
    public partial class Errors
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

        [StringLength(2000)]
        public string user_message { get; set; }

        public int? service { get; set; }

        public int? event_id { get; set; }

        public int? hresult { get; set; }

        [StringLength(2000)]
        public string inner_exception { get; set; }

        [StringLength(2000)]
        public string message { get; set; }

        [StringLength(250)]
        public string source { get; set; }

        public string stack_trace { get; set; }
    }
}
