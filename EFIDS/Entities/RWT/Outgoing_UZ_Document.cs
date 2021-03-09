namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Outgoing_UZ_Document")]
    public partial class Outgoing_UZ_Document
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Outgoing_UZ_Document()
        {
            Outgoing_UZ_Document_Pay = new HashSet<Outgoing_UZ_Document_Pay>();
            Outgoing_UZ_Vagon = new HashSet<Outgoing_UZ_Vagon>();
        }

        public long id { get; set; }

        [Required]
        [StringLength(50)]
        public string id_doc_uz { get; set; }

        public int? nom_doc { get; set; }

        public int? code_stn_from { get; set; }

        public int? code_stn_to { get; set; }

        public int? country_nazn { get; set; }

        public int? code_border_checkpoint { get; set; }

        public DateTime? cross_date { get; set; }

        public int? code_shipper { get; set; }

        public int? code_consignee { get; set; }

        [StringLength(2)]
        public string vid { get; set; }

        [StringLength(20)]
        public string code_payer { get; set; }

        public int? distance_way { get; set; }

        public long? osum { get; set; }

        public DateTime? date_sozdan { get; set; }

        public DateTime? date_otpr { get; set; }

        public DateTime? date_pr { get; set; }

        public DateTime? date_grpol { get; set; }

        public DateTime? date_vid { get; set; }

        [StringLength(400)]
        public string info_sht { get; set; }

        [StringLength(800)]
        public string name_gr { get; set; }

        [StringLength(200)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual Directory_BorderCheckpoint Directory_BorderCheckpoint { get; set; }

        public virtual Directory_Consignee Directory_Consignee { get; set; }

        public virtual Directory_ExternalStation Directory_ExternalStation { get; set; }

        public virtual Directory_ExternalStation Directory_ExternalStation1 { get; set; }

        public virtual Directory_PayerSender Directory_PayerSender { get; set; }

        public virtual Directory_Shipper Directory_Shipper { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Document_Pay> Outgoing_UZ_Document_Pay { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Vagon> Outgoing_UZ_Vagon { get; set; }
    }
}
