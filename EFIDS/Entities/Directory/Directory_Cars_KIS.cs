namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Cars_KIS")]
    public partial class Directory_Cars_KIS
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int num { get; set; }

        public int? id_sob_kis { get; set; }

        public int? id_genus { get; set; }

        public int? id_operator { get; set; }

        public int? id_limiting { get; set; }
    }
}
