namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.OutgoingDetentionReturn")]
    public partial class OutgoingDetentionReturn
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public OutgoingDetentionReturn()
        {
            OutgoingCars = new HashSet<OutgoingCars>();
        }

        public int id { get; set; }

        public int num { get; set; }

        public int id_detention_return { get; set; }

        public int type_detention_return { get; set; }

        public DateTime date_start { get; set; }

        public DateTime? date_stop { get; set; }

        [StringLength(20)]
        public string num_act { get; set; }

        public DateTime? date_act { get; set; }

        [StringLength(200)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual Directory_DetentionReturn Directory_DetentionReturn { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutgoingCars> OutgoingCars { get; set; }
    }
}
