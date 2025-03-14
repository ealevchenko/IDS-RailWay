namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Outgoing_UZ_Vagon_Pay")]
    public partial class Outgoing_UZ_Vagon_Pay
    {
        public int id { get; set; }

        public long id_vagon { get; set; }

        [Required]
        [StringLength(3)]
        public string kod { get; set; }

        public long summa { get; set; }

        public virtual Outgoing_UZ_Vagon Outgoing_UZ_Vagon { get; set; }
    }
}
