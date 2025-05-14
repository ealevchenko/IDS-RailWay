namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Arrival_UZ_Document")]
    public partial class Arrival_UZ_Document
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Arrival_UZ_Document()
        {
            Arrival_UZ_Document_Acts = new HashSet<Arrival_UZ_Document_Acts>();
            Arrival_UZ_Document1 = new HashSet<Arrival_UZ_Document>();
            Arrival_UZ_Document_Docs = new HashSet<Arrival_UZ_Document_Docs>();
            Arrival_UZ_Document_Pay = new HashSet<Arrival_UZ_Document_Pay>();
            Arrival_UZ_Vagon = new HashSet<Arrival_UZ_Vagon>();
        }

        public long id { get; set; }

        [Required]
        [StringLength(50)]
        public string id_doc_uz { get; set; }

        public int? nom_doc { get; set; }

        public int? nom_main_doc { get; set; }

        public int? code_stn_from { get; set; }

        public int? code_stn_to { get; set; }

        public int? code_border_checkpoint { get; set; }

        public DateTime? cross_time { get; set; }

        public int? code_shipper { get; set; }

        public int? code_consignee { get; set; }

        public bool? klient { get; set; }

        [StringLength(20)]
        public string code_payer_sender { get; set; }

        [StringLength(20)]
        public string code_payer_arrival { get; set; }

        public int? distance_way { get; set; }

        [StringLength(200)]
        public string note { get; set; }

        public long? parent_id { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public bool? manual { get; set; }
        public DateTime? date_otpr { get; set; }

        public DateTime? srok_end { get; set; }

        public DateTime? date_grpol { get; set; }

        public DateTime? date_pr { get; set; }

        public DateTime? date_vid { get; set; }

        [StringLength(20)]
        public string code_payer_local { get; set; }

        [Column(TypeName = "money")]
        public decimal? tariff_contract { get; set; }

        public DateTime? calc_payer { get; set; }

        [StringLength(50)]
        public string calc_payer_user { get; set; }

        public int? IdActServices1 { get; set; }

        [StringLength(50)]
        public string NumActServices1 { get; set; }

        public int? IdActServices2 { get; set; }

        [StringLength(50)]
        public string NumActServices2 { get; set; }

        public int? IdActServices3 { get; set; }

        [StringLength(50)]
        public string NumActServices3 { get; set; }

        public DateTime? Verification { get; set; }

        [StringLength(50)]
        public string VerificationUser { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Document_Acts> Arrival_UZ_Document_Acts { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Document> Arrival_UZ_Document1 { get; set; }

        public virtual Arrival_UZ_Document Arrival_UZ_Document2 { get; set; }

        public virtual Directory_BorderCheckpoint Directory_BorderCheckpoint { get; set; }

        public virtual Directory_Consignee Directory_Consignee { get; set; }

        public virtual Directory_ExternalStation Directory_ExternalStation { get; set; }

        public virtual Directory_ExternalStation Directory_ExternalStation1 { get; set; }

        public virtual Directory_PayerArrival Directory_PayerArrival { get; set; }

        public virtual Directory_PayerSender Directory_PayerSender { get; set; }

        public virtual Directory_Shipper Directory_Shipper { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Document_Docs> Arrival_UZ_Document_Docs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Document_Pay> Arrival_UZ_Document_Pay { get; set; }

        public virtual UZ_DOC UZ_DOC { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon> Arrival_UZ_Vagon { get; set; }
    }
}
