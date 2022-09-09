namespace EFIDS_Arhiv.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.UZ_DOC_PDF")]
    public partial class UZ_DOC_PDF
    {
        [Key]
        [StringLength(50)]
        public string num_doc { get; set; }

        public int revision { get; set; }

        [StringLength(10)]
        public string num_nakl { get; set; }

        public bool? output { get; set; }

        public byte[] pdf_doc { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }
    }
}
