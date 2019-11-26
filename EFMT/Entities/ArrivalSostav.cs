namespace EFMT.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("METRANS.ArrivalSostav")]
    public partial class ArrivalSostav
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ArrivalSostav()
        {
            ArrivalCars = new HashSet<ArrivalCars>();
            ArrivalSostav1 = new HashSet<ArrivalSostav>();
        }

        public long id { get; set; }

        public long id_arrived { get; set; }

        [Required]
        [StringLength(50)]
        public string file_name { get; set; }

        [Required]
        [StringLength(50)]
        public string composition_index { get; set; }

        public DateTime date_time { get; set; }

        public int operation { get; set; }

        public DateTime create { get; set; }

        public DateTime? close { get; set; }

        public DateTime? arrived { get; set; }

        public long? Parent_id { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ArrivalCars> ArrivalCars { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ArrivalSostav> ArrivalSostav1 { get; set; }

        public virtual ArrivalSostav ArrivalSostav2 { get; set; }
    }
}
