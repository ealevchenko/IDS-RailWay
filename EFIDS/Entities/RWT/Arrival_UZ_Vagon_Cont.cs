namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Arrival_UZ_Vagon_Cont")]
    public partial class Arrival_UZ_Vagon_Cont
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Arrival_UZ_Vagon_Cont()
        {
            Arrival_UZ_Cont_Pay = new HashSet<Arrival_UZ_Cont_Pay>();
        }

        public long id { get; set; }

        public long id_vagon { get; set; }

        [Required]
        [StringLength(11)]
        public string nom_cont { get; set; }

        [StringLength(4)]
        public string kod_tiporazmer { get; set; }

        public int? gruzp { get; set; }

        public int? ves_tary_arc { get; set; }

        public int? id_cargo { get; set; }

        public int? id_cargo_gng { get; set; }

        public int? kol_pac { get; set; }

        [StringLength(3)]
        public string pac { get; set; }

        public int? vesg { get; set; }

        public double? vesg_reweighing { get; set; }

        [StringLength(20)]
        public string nom_zpu { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Cont_Pay> Arrival_UZ_Cont_Pay { get; set; }

        public virtual Arrival_UZ_Vagon Arrival_UZ_Vagon { get; set; }

        public virtual Directory_Cargo Directory_Cargo { get; set; }

        public virtual Directory_CargoGNG Directory_CargoGNG { get; set; }
    }
}
