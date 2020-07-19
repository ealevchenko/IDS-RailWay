namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_WagonsRent")]
    public partial class Directory_WagonsRent
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_WagonsRent()
        {
            Directory_WagonsRent1 = new HashSet<Directory_WagonsRent>();
        }

        public int id { get; set; }

        public int num { get; set; }

        public int? id_operator { get; set; }

        public int? id_limiting { get; set; }

        public DateTime? rent_start { get; set; }

        public DateTime? rent_end { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public int? parent_id { get; set; }

        public virtual Directory_LimitingLoading Directory_LimitingLoading { get; set; }

        public virtual Directory_OperatorsWagons Directory_OperatorsWagons { get; set; }

        public virtual Directory_Wagons Directory_Wagons { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_WagonsRent> Directory_WagonsRent1 { get; set; }

        public virtual Directory_WagonsRent Directory_WagonsRent2 { get; set; }
    }
}
