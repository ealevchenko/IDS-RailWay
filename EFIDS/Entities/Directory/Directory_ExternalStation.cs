namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_ExternalStation")]
    public partial class Directory_ExternalStation
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_ExternalStation()
        {
            Arrival_UZ_Document = new HashSet<Arrival_UZ_Document>();
            Arrival_UZ_Document1 = new HashSet<Arrival_UZ_Document>();
            Outgoing_UZ_Document = new HashSet<Outgoing_UZ_Document>();
            Outgoing_UZ_Document1 = new HashSet<Outgoing_UZ_Document>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int code { get; set; }

        [Required]
        [StringLength(50)]
        public string station_name_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string station_name_en { get; set; }

        public int code_inlandrailway { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Document> Arrival_UZ_Document { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Document> Arrival_UZ_Document1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Document> Outgoing_UZ_Document { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Document> Outgoing_UZ_Document1 { get; set; }

        public virtual Directory_InlandRailway Directory_InlandRailway { get; set; }
    }
}
