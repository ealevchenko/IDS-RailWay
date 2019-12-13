namespace EFMT.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("METRANS.ArrivalCars")]
    public partial class ArrivalCars
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ArrivalCars()
        {
            ArrivalCars1 = new HashSet<ArrivalCars>();
        }

        public long id { get; set; }

        public long id_sostav { get; set; }

        public int position { get; set; }

        public int num { get; set; }

        public int country_code { get; set; }

        public float wight { get; set; }

        public int cargo_code { get; set; }

        [Required]
        [StringLength(50)]
        public string cargo { get; set; }

        public int station_code { get; set; }

        [Required]
        [StringLength(50)]
        public string station { get; set; }

        public int consignee { get; set; }

        [Required]
        [StringLength(50)]
        public string operation { get; set; }

        [Required]
        [StringLength(50)]
        public string composition_index { get; set; }

        public DateTime date_operation { get; set; }

        public int train { get; set; }

        public int? num_doc_arrived { get; set; }

        public DateTime? arrived { get; set; }

        public long? parent_id { get; set; }

        [StringLength(50)]
        public string user_name { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ArrivalCars> ArrivalCars1 { get; set; }

        public virtual ArrivalCars ArrivalCars2 { get; set; }

        public virtual ArrivalSostav ArrivalSostav { get; set; }
    }
}
