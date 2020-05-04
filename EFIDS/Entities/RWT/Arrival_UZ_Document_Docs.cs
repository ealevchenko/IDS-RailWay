namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Arrival_UZ_Document_Docs")]
    public partial class Arrival_UZ_Document_Docs
    {
        public int id { get; set; }

        public long id_document { get; set; }

        [StringLength(25)]
        public string id_doc { get; set; }

        [StringLength(500)]
        public string description { get; set; }

        public DateTime? doc_date { get; set; }

        [StringLength(3)]
        public string doc_type { get; set; }

        [StringLength(150)]
        public string doc_type_name { get; set; }

        [MaxLength(1)]
        public byte[] doc { get; set; }

        public virtual Arrival_UZ_Document Arrival_UZ_Document { get; set; }
    }
}
