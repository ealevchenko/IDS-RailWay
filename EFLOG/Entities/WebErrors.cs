namespace EFLOG.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LOGS.WebErrors")]
    public partial class WebErrors
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

        [StringLength(500)]
        public string user_agent { get; set; }

        [StringLength(10)]
        public string request_type { get; set; }

        public int? httpcode { get; set; }

        public int? hresult { get; set; }

        [StringLength(1000)]
        public string inner_exception { get; set; }

        [StringLength(1000)]
        public string message { get; set; }

        [StringLength(250)]
        public string source { get; set; }

        public string stack_trace { get; set; }
    }
}
