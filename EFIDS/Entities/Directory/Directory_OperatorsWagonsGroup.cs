namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_OperatorsWagonsGroup")]
    public partial class Directory_OperatorsWagonsGroup
    {
        public int id { get; set; }

        [Required]
        [StringLength(20)]
        public string group { get; set; }

        public int id_operator { get; set; }

        [StringLength(200)]
        public string description { get; set; }
    }
}
