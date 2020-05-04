namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Arrival_UZ_Document_Pay")]
    public partial class Arrival_UZ_Document_Pay
    {
        public int id { get; set; }

        public long id_document { get; set; }

        [Required]
        [StringLength(3)]
        public string kod { get; set; }

        public long summa { get; set; }

        public virtual Arrival_UZ_Document Arrival_UZ_Document { get; set; }
    }
}
