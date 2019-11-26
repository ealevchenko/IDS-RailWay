namespace EFMT.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("METRANS.ApproachesCars")]
    public partial class ApproachesCars
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ApproachesCars()
        {
            ApproachesCars1 = new HashSet<ApproachesCars>();
        }

        public long id { get; set; }

        public long id_sostav { get; set; }

        [Required]
        [StringLength(50)]
        public string composition_index { get; set; }

        public int num { get; set; }

        public int country_code { get; set; }

        public float weight { get; set; }

        public int cargo_code { get; set; }

        public int train_number { get; set; }

        [Required]
        [StringLength(50)]
        public string operation { get; set; }

        public DateTime date_operation { get; set; }

        public int code_station_from { get; set; }

        public int code_station_on { get; set; }

        public int code_station_current { get; set; }

        public int count_wagons { get; set; }

        public int sum_weight { get; set; }

        public int flag_cargo { get; set; }

        public int route { get; set; }

        public int owner { get; set; }

        public int? num_doc_arrived { get; set; }

        public DateTime? arrived { get; set; }

        public long? parent_id { get; set; }

        [StringLength(50)]
        public string user_name { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ApproachesCars> ApproachesCars1 { get; set; }

        public virtual ApproachesCars ApproachesCars2 { get; set; }

        public virtual ApproachesSostav ApproachesSostav { get; set; }
    }
}
