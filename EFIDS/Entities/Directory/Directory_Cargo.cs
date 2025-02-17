namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Cargo")]
    public partial class Directory_Cargo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Cargo()
        {
            Arrival_UZ_Vagon = new HashSet<Arrival_UZ_Vagon>();
            Arrival_UZ_Vagon_Cont = new HashSet<Arrival_UZ_Vagon_Cont>();
            Outgoing_UZ_Vagon_Cont = new HashSet<Outgoing_UZ_Vagon_Cont>();
            Outgoing_UZ_Vagon = new HashSet<Outgoing_UZ_Vagon>();
            Usage_Fee_Period_Detali = new HashSet<Usage_Fee_Period_Detali>();
            Usage_Fee_Period_Detali1 = new HashSet<Usage_Fee_Period_Detali>();
        }

        public int id { get; set; }

        public int id_group { get; set; }
        public int? id_out_group { get; set; }

        public int id_cargo_etsng { get; set; }

        [Required]
        [StringLength(50)]
        public string cargo_name_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string cargo_name_en { get; set; }

        [StringLength(20)]
        public string code_sap { get; set; }

        public bool? sending { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon> Arrival_UZ_Vagon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon_Cont> Arrival_UZ_Vagon_Cont { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Vagon_Cont> Outgoing_UZ_Vagon_Cont { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Vagon> Outgoing_UZ_Vagon { get; set; }

        public virtual Directory_CargoETSNG Directory_CargoETSNG { get; set; }

        public virtual Directory_CargoGroup Directory_CargoGroup { get; set; }
        public virtual Directory_CargoOutGroup Directory_CargoOutGroup { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Usage_Fee_Period_Detali> Usage_Fee_Period_Detali { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Usage_Fee_Period_Detali> Usage_Fee_Period_Detali1 { get; set; }
    }
}
