namespace EFLOG.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LOGS.StatusServices")]
    public partial class StatusServices
    {
        public int id { get; set; }

        public int service { get; set; }

        public DateTime? start { get; set; }

        public DateTime? execution { get; set; }

        public int? current { get; set; }

        public int? max { get; set; }

        public int? min { get; set; }
    }
}
