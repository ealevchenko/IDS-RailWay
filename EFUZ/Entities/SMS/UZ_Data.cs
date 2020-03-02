namespace EFUZ.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class UZ_Data
    {
        public int id { get; set; }

        [Required]
        [StringLength(150)]
        public string doc_Id { get; set; }

        public int doc_Revision { get; set; }

        [StringLength(15)]
        public string doc_Status { get; set; }

        [Required]
        [StringLength(4)]
        public string depart_code { get; set; }

        [Required]
        [StringLength(4)]
        public string arrived_code { get; set; }

        public DateTime? dt { get; set; }

        public DateTime? update_dt { get; set; }

        [Column(TypeName = "xml")]
        public string raw_xml { get; set; }
    }
}
