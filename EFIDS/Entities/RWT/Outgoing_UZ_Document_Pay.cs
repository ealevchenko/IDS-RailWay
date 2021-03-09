namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Outgoing_UZ_Document_Pay")]
    public partial class Outgoing_UZ_Document_Pay
    {
        public int id { get; set; }

        public long id_document { get; set; }

        public int code_payer { get; set; }

        public int type_payer { get; set; }

        [Required]
        [StringLength(3)]
        public string kod { get; set; }

        public long summa { get; set; }

        public virtual Outgoing_UZ_Document Outgoing_UZ_Document { get; set; }
    }
}
